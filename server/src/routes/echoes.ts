import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { generateStructured } from "../arkClient.js";
import { EchoSearchSchema, EchoReserveSchema, type EchoItem } from "../schemas.js";
import { buildEchoSearchSystem, buildEchoSearchUserPrompt } from "../prompts.js";
import {
  createEchoSession,
  getEchoSession,
  takeNextBatch,
  appendToPool,
  markReservePending,
  currentFigures,
  incrementRefresh,
} from "../sessionStore.js";

const MAX_REFRESH = 3;
const BATCH_SIZE = 3;

export const echoesRouter = Router();

const SearchRequestSchema = z.object({
  user_question: z.string().min(1),
  essential_question: z.string().min(1),
  motif_name: z.string().min(1),
});

echoesRouter.post("/search", async (req, res) => {
  const parsed = SearchRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { user_question, essential_question, motif_name } = parsed.data;

  try {
    const result = await generateStructured(
      buildEchoSearchSystem(9),
      buildEchoSearchUserPrompt(user_question, essential_question, motif_name, []),
      EchoSearchSchema,
    );

    if (!result) {
      return res.status(502).json({ error: "model_output_unparseable" });
    }

    const sessionId = randomUUID();
    createEchoSession(sessionId, {
      userQuestion: user_question,
      essentialQuestion: essential_question,
      motifName: motif_name,
      initialEchoes: result.echoes,
    });

    const batch = takeNextBatch(sessionId, BATCH_SIZE);
    res.json({
      session_id: sessionId,
      echoes: batch,
      refresh_left: MAX_REFRESH,
      can_refresh: true,
    });
  } catch (err) {
    console.error("[echoes/search] failed:", err);
    res.status(502).json({ error: "ai_generation_failed" });
  }
});

const RefreshRequestSchema = z.object({
  session_id: z.string().min(1),
});

echoesRouter.post("/refresh", async (req, res) => {
  const parsed = RefreshRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { session_id } = parsed.data;
  const session = getEchoSession(session_id);
  if (!session) {
    return res.status(404).json({ error: "session_not_found" });
  }

  const refreshCount = incrementRefresh(session_id);
  if (refreshCount > MAX_REFRESH) {
    return res.json({ echoes: [], refresh_left: 0, can_refresh: false });
  }

  // On the first refresh, asynchronously top off the pool with 6 reserve echoes so
  // batches 2 and 3 are ready without the user ever waiting on a second refresh.
  if (refreshCount === 1) {
    markReservePending(session_id);
    void (async () => {
      try {
        const reserve = await generateStructured(
          buildEchoSearchSystem(6),
          buildEchoSearchUserPrompt(
            session.userQuestion,
            session.essentialQuestion,
            session.motifName,
            currentFigures(session_id),
          ),
          EchoReserveSchema,
        );
        if (reserve) {
          appendToPool(session_id, reserve.echoes as EchoItem[]);
        }
      } catch (err) {
        console.error("[echoes/refresh] reserve generation failed:", err);
      }
    })();
  }

  // Pool may not have caught up yet if a later refresh lands before the background
  // reserve finished — wait briefly and re-check rather than serving an empty batch.
  let batch = takeNextBatch(session_id, BATCH_SIZE);
  if (batch.length === 0) {
    await new Promise((r) => setTimeout(r, 2500));
    batch = takeNextBatch(session_id, BATCH_SIZE);
  }

  res.json({
    echoes: batch,
    refresh_left: Math.max(0, MAX_REFRESH - refreshCount),
    can_refresh: refreshCount < MAX_REFRESH,
  });
});

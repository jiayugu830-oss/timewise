import { Router } from "express";
import { z } from "zod";
import { generateStructured } from "../arkClient.js";
import { MotifSchema, ConversationTurnSchema } from "../schemas.js";
import { MOTIF_SYSTEM, buildMotifUserPrompt } from "../prompts.js";

const RequestSchema = z.object({
  essential_question: z.string().min(1),
  conversation_history: z.array(ConversationTurnSchema).default([]),
});

export const motifRouter = Router();

motifRouter.post("/", async (req, res) => {
  const parsed = RequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { essential_question, conversation_history } = parsed.data;

  try {
    const result = await generateStructured(
      MOTIF_SYSTEM,
      buildMotifUserPrompt(essential_question, conversation_history),
      MotifSchema,
    );

    if (!result) {
      return res.status(502).json({ error: "model_output_unparseable" });
    }
    res.json(result);
  } catch (err) {
    console.error("[motif] failed:", err);
    res.status(502).json({ error: "ai_generation_failed" });
  }
});

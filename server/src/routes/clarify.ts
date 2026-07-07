import { Router } from "express";
import { z } from "zod";
import { generateStructured } from "../arkClient.js";
import { ClarifyTurnSchema, ConversationTurnSchema } from "../schemas.js";
import { CLARIFY_SYSTEM, buildClarifyUserPrompt } from "../prompts.js";

const RequestSchema = z.object({
  user_question: z.string().min(1),
  conversation_history: z.array(ConversationTurnSchema).default([]),
});

export const clarifyRouter = Router();

clarifyRouter.post("/", async (req, res) => {
  const parsed = RequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { user_question, conversation_history } = parsed.data;

  try {
    const result = await generateStructured(
      CLARIFY_SYSTEM,
      buildClarifyUserPrompt(user_question, conversation_history),
      ClarifyTurnSchema,
    );

    if (!result) {
      return res.status(502).json({ error: "model_output_unparseable" });
    }
    res.json(result);
  } catch (err) {
    console.error("[clarify] failed:", err);
    res.status(502).json({ error: "ai_generation_failed" });
  }
});

import { Router } from "express";
import { z } from "zod";
import { generateStructured } from "../arkClient.js";
import { EssenceSchema, ConversationTurnSchema } from "../schemas.js";
import { ESSENCE_SYSTEM, buildEssenceUserPrompt } from "../prompts.js";

const RequestSchema = z.object({
  user_question: z.string().min(1),
  conversation_history: z.array(ConversationTurnSchema).default([]),
});

export const essenceRouter = Router();

essenceRouter.post("/", async (req, res) => {
  const parsed = RequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { user_question, conversation_history } = parsed.data;

  try {
    const result = await generateStructured(
      ESSENCE_SYSTEM,
      buildEssenceUserPrompt(user_question, conversation_history),
      EssenceSchema,
    );

    if (!result) {
      return res.status(502).json({ error: "model_output_unparseable" });
    }
    res.json(result);
  } catch (err) {
    console.error("[essence] failed:", err);
    res.status(502).json({ error: "ai_generation_failed" });
  }
});

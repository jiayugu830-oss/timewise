import { Router } from "express";
import { z } from "zod";
import { generateStructured } from "../arkClient.js";
import { EchoDetailSchema, EchoItemSchema } from "../schemas.js";
import { ECHO_DETAIL_SYSTEM, buildEchoDetailUserPrompt } from "../prompts.js";

const RequestSchema = z.object({
  user_question: z.string().min(1),
  essential_question: z.string().min(1),
  selected_echo: EchoItemSchema,
});

export const echoDetailRouter = Router();

echoDetailRouter.post("/", async (req, res) => {
  const parsed = RequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "invalid_request", details: parsed.error.flatten() });
  }
  const { user_question, essential_question, selected_echo } = parsed.data;

  try {
    const result = await generateStructured(
      ECHO_DETAIL_SYSTEM,
      buildEchoDetailUserPrompt(user_question, essential_question, selected_echo),
      EchoDetailSchema,
    );

    if (!result) {
      return res.status(502).json({ error: "model_output_unparseable" });
    }
    res.json(result);
  } catch (err) {
    console.error("[echo-detail] failed:", err);
    res.status(502).json({ error: "ai_generation_failed" });
  }
});

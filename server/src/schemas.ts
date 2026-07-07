import { z } from "zod";

export const CitationType = z.enum(["原文可考", "译文整理", "历史背景概述"]);

export const ConversationTurnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});
export type ConversationTurn = z.infer<typeof ConversationTurnSchema>;

// 1. 澄清之问
export const ClarifyTurnSchema = z.object({
  restatement: z.string(),
  question: z.string(),
  options: z.tuple([z.string(), z.string(), z.string()]),
  should_continue: z.boolean(),
});
export type ClarifyTurn = z.infer<typeof ClarifyTurnSchema>;

// 2. 问题确认卡
export const EssenceSchema = z.object({
  essential_question: z.string(),
});
export type Essence = z.infer<typeof EssenceSchema>;

// 3. 人生母题
export const MotifSchema = z.object({
  motif_name: z.string(),
  motif_explanation: z.string(),
});
export type Motif = z.infer<typeof MotifSchema>;

// 4. 历史回声搜索
export const EchoItemSchema = z.object({
  era: z.string(),
  figure: z.string(),
  one_liner: z.string(),
  quote: z.string(),
  quote_source: z.string(),
  citation_type: CitationType,
});
export type EchoItem = z.infer<typeof EchoItemSchema>;

export const EchoSearchSchema = z.object({
  echoes: z.array(EchoItemSchema).length(9),
});
export type EchoSearchResult = z.infer<typeof EchoSearchSchema>;

export const EchoReserveSchema = z.object({
  echoes: z.array(EchoItemSchema).length(6),
});

// 5. 历史回声详情
export const EchoDetailSchema = z.object({
  user_question_restated: z.string(),
  historical_situation: z.string(),
  how_he_faced_it: z.string(),
  original_text: z.object({
    quote: z.string(),
    source: z.string(),
    citation_type: CitationType,
  }),
  modern_interpretation: z.string(),
  how_to_understand_now: z.string(),
  one_small_action: z.string(),
});
export type EchoDetail = z.infer<typeof EchoDetailSchema>;

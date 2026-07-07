import { z, type ZodType } from "zod";

if (!process.env.ARK_API_KEY) {
  console.warn(
    "[timewise-server] ARK_API_KEY is not set. AI endpoints will fail until it is configured " +
      "(see server/.env.example).",
  );
}

const ARK_BASE_URL = process.env.ARK_BASE_URL ?? "https://ark.cn-beijing.volces.com/api/v3";
export const MODEL = process.env.ARK_MODEL ?? "doubao-seed-2-1-pro-260628";

interface ArkOutputTextContent {
  type: "output_text";
  text: string;
}

interface ArkMessageOutputItem {
  type: "message";
  content: Array<ArkOutputTextContent | { type: string; [key: string]: unknown }>;
}

interface ArkResponse {
  output?: Array<ArkMessageOutputItem | { type: string; [key: string]: unknown }>;
}

function extractOutputText(response: ArkResponse): string | null {
  const messageItem = response.output?.find(
    (item): item is ArkMessageOutputItem => item.type === "message",
  );
  if (!messageItem) return null;
  const textContent = messageItem.content.find(
    (c): c is ArkOutputTextContent => c.type === "output_text",
  );
  return textContent?.text ?? null;
}

function stripCodeFence(text: string): string {
  const trimmed = text.trim();
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenceMatch ? fenceMatch[1] : trimmed;
}

async function callArk(systemPrompt: string, userPrompt: string): Promise<string | null> {
  const res = await fetch(`${ARK_BASE_URL}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.ARK_API_KEY ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      instructions: systemPrompt,
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Ark API request failed: ${res.status} ${res.statusText} ${body}`);
  }

  const data = (await res.json()) as ArkResponse;
  return extractOutputText(data);
}

/**
 * Generates a structured object matching `schema` by asking Ark for JSON-only
 * output (no native structured-output API confirmed for Ark yet), then
 * manually parsing + validating, with one retry on failure.
 */
export async function generateStructured<T>(
  systemPrompt: string,
  userPrompt: string,
  schema: ZodType<T>,
): Promise<T | null> {
  const jsonSchema = z.toJSONSchema(schema);
  const fullSystemPrompt = `${systemPrompt}

【输出格式要求】
你必须只输出一个 JSON 对象，不能包含任何解释性文字、不能使用 markdown 代码块包裹，不能在 JSON 前后添加任何其他字符。输出必须严格符合以下 JSON Schema：
${JSON.stringify(jsonSchema, null, 2)}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    const prompt =
      attempt === 0
        ? userPrompt
        : `${userPrompt}\n\n（上一次输出未能解析为合法 JSON 或不符合 schema，请严格只输出符合 schema 的 JSON 对象，不要包含任何其他内容。）`;

    const rawText = await callArk(fullSystemPrompt, prompt);
    if (!rawText) continue;

    try {
      const parsed = JSON.parse(stripCodeFence(rawText));
      const result = schema.safeParse(parsed);
      if (result.success) return result.data;
    } catch {
      // fall through to retry
    }
  }

  return null;
}

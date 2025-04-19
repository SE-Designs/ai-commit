import OpenAI from "openai";
import { config } from "../config";
import { getCommitPrompt } from "./commit-style";
import { CommitStyle } from "types";

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
  baseURL: config.baseURL,
});

export async function generateCommitMessage(diff: string, style: CommitStyle): Promise<string> {
  try {
    const prompt = getCommitPrompt(diff, style);

    const res = await openai.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: "system",
          content: `Ты — помощник, который пишет краткие и понятные git commit-сообщения. Используй present tense.`,
        },
        {
          role: "user",
          content: prompt || `Вот git diff:\n\n${diff}\n\nСгенерируй commit-сообщение:`,
        },
      ],
    });

    return res.choices[0].message?.content?.trim() ?? "Update code";
  } catch (error) {
    console.error("❌ Failed in file ai.ts:", error);
    return "Update code";
  }
}

import OpenAI from "openai";
import { config } from "../config";
import { getCommitPrompt } from "./commit-style";
import { CommitStyle } from "types";
import chalk from "chalk";

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
          content: `You are an assistant that writes concise and clear git commit messages. Use present tense.`,
        },
        {
          role: "user",
          content: prompt || `Here is the git diff:\n\n${diff}\n\nGenerate a commit message:`,
        },
      ],
    });

    return res.choices[0].message?.content?.trim() ?? "Update code";
  } catch (error) {
    console.error(chalk.red("❌ Failed in file ai.ts:", error));
    return "Update code";
  }
}

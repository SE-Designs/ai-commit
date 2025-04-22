import { config } from "../config";
import { CommitStyle } from "types";

type PromptGenerator = (diff: string, userPrompt?: string) => string;

const promptGenerators: Record<CommitStyle, PromptGenerator> = {
  conventional: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message in Conventional Commit style. Use a type and a brief description. Avoid capital letters after colon. Example:\n- feat: add user auth\n- fix: fix bug in ID\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  gitmoji: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message using Gitmoji style. Start with emoji code and short description. Example:\n- ✨: add login\n- 🐛: fix crash\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  emoji: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message with emoji and brief description. No emoji codes. Example:\n- ✨ Add login\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  imperative: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message in imperative mood. Example:\n- Add login page\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  simple: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a short commit message. Example:\n- Add auth\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  detailed: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a detailed commit message with explanation. Example:\n- Implemented login with validation.\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  semver: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\nUse Semantic Versioning style: feat, fix, etc. Example:\n- feat: reset password\n${userPrompt ? `\n\nExtra instructions:\n${userPrompt}` : ""}`,

  custom: (diff, userPrompt) =>
    `Here is the git diff:\n\n${diff}\n\n${userPrompt || "Generate a clear and professional commit message."}`,
};

function getCommitPrompt(diff: string, style: CommitStyle): string {
  const userPrompt = config.prompt?.trim();
  return promptGenerators[style](diff, userPrompt);
}

export { getCommitPrompt };

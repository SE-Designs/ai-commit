import { config } from "../config";
import { CommitStyle } from "types";

type PromptGenerator = (diff: string) => string;

const promptGenerators: Record<CommitStyle, PromptGenerator> = {
  conventional: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message in Conventional Commit style. Use a type and a brief description. Avoid using capital letters after colon. Example:\n\n- feat: add user authentication flow\n- fix: resolve issue with incorrect user ID\n- chore: update dependencies`,

  gitmoji: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message using Gitmoji style. Start with an emoji code and a brief description. Example:\n\n- ✨: add login feature\n- 🐛: fix crash on dashboard load\n- ♻️: refactor form validation logic`,

  emoji: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message with an emoji and a brief English description. No emoji codes, only emojis. Example:\n\n- ✨ Add login feature\n- 🐛 Fix crash on dashboard\n- ♻️ Refactor validation logic`,

  imperative: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message in imperative mood (present tense). Example:\n\n- Add login page\n- Fix broken redirect\n- Update user service`,

  simple: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a short and clear commit message with minimal words. Example:\n\n- Add auth\n- Fix bug\n- Cleanup code`,

  detailed: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a detailed commit message with 1–2 sentences explaining what was done and why. Example:\n\n- Implemented login form with basic validation to allow users to sign in using email and password.\n- Fixed issue with infinite redirect loop after logout by updating auth middleware.`,

  semver: (diff) =>
    `Here is the git diff:\n\n${diff}\n\nGenerate a commit message in Semantic Versioning style, using "feat", "fix", "chore", etc., like Conventional Commits. Example:\n\n- feat: implement password reset flow\n- fix: correct typo in error message\n- chore: remove unused imports`,

  custom: (diff) => {
    const userPrompt = config.customPrompt?.trim();
    return `Here is the git diff:\n\n${diff}\n\n${userPrompt || "Generate a clear and professional commit message."}`;
  },
};

function getCommitPrompt(diff: string, style: CommitStyle): string {
  return (promptGenerators[style] ?? promptGenerators.conventional)(diff);
}

export { getCommitPrompt };
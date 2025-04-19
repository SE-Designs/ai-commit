import { execSync } from "child_process";
import fs from "fs";
import { generateCommitMessage } from "./ai";
import { config } from "../config";
import { getGitDiff } from "./git";
import { CommitStyle } from "types";

export async function handleAutoCommit(style: CommitStyle): Promise<void> {
  const diff = await getGitDiff();
  const commitMessage = await generateCommitMessage(diff, style); // Передаем стиль

  console.log(`🧠 Suggested commit message: ${commitMessage}`);

  if (config.autoCommit) {
    console.log("Committing changes...");
    fs.writeFileSync("temp/git-diff.txt", diff);

    try {
      execSync(`git commit -am "${commitMessage}"`);
      console.log("Changes committed successfully!");
    } catch (error) {
      console.error("❌ Failed in file auto-commit.ts:", error);
    }
  }
}

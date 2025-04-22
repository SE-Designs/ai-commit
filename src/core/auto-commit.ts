import { execSync } from "child_process";
import fs from "fs";
import chalk from "chalk";
import { generateCommitMessage } from "./ai";
import { config } from "../config";
import { getGitDiff } from "./git";
import { CommitStyle, CommandOptions } from "types";

interface AutoCommitParams {
  style: CommitStyle;
  options?: Partial<CommandOptions>;
}

export async function handleAutoCommit({
  style,
  options = {},
}: AutoCommitParams): Promise<void> {
  const autoCommit = options.auto || config.autoCommit || false;

  if (!autoCommit) {
    console.log(chalk.blue("📝 Auto commit is disabled."));
    return;
  }

  console.log(chalk.blue("📝 Auto commit enabled."));

  const diff = await getGitDiff(options.all ?? config.useAllDiff);
  const commitMessage = await generateCommitMessage(diff, style);

  // const tempDir = "files";
  // if (!fs.existsSync(tempDir)) {
  //   fs.mkdirSync(tempDir);
  // }

  // fs.writeFileSync(`${tempDir}/ai-commit-auto.diff`, diff);

  try {
    execSync(`git commit -am "${commitMessage}"`);
    console.log(chalk.green("✅ Changes committed successfully!"));
    console.log(chalk.bgGreen(commitMessage));
  } catch (error) {
    console.error(chalk.red("❌ Commit failed:"), error);
  }
}

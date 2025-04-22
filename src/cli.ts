#!/usr/bin/env node

import { program } from "commander";
import { config } from "./config";
import { generateConfigFile } from "./core/generate-config";
import { handleAutoCommit } from "./core/auto-commit";
import { generateCommitMessage } from "./core/ai";
import { getGitDiff } from "./core/git";
import chalk from "chalk";

program
  .name("ai-commit")
  .command("generate")
  .description("Generate ai-commit.config.js file")
  .action(generateConfigFile);

program
  .name("ai-commit")
  .description("Generate commit messages using AI")
  .action(async () => {
    const {
      style,
      model,
      maxLen,
      useAllDiff,
      autoCommit
    } = config;

    console.log(chalk.green("🚀 AI Commit CLI"));
    console.log(chalk.blue(`📦 Using model: ${model}`));
    console.log(chalk.blue(`🎨 Commit style: ${style}`));
    console.log(chalk.blue(`📏 Max length: ${maxLen}`));
    console.log(chalk.blue(`📝 Use all diff: ${useAllDiff}`));
    console.log(chalk.blue(`🤖 Auto commit: ${autoCommit}`));

    if (autoCommit) {
      await handleAutoCommit({ style, options: config });
    } else {
      const diff = await getGitDiff();

      if (!diff) {
        console.error(chalk.red("❌ No changes detected."));
        return;
      }

      const commitMessage = await generateCommitMessage(diff, style);

      console.log(chalk.bgGreenBright(`🧠 Suggested commit message: ${commitMessage}`));
    }
  });

program.parse();

#!/usr/bin/env node

import { program } from "commander";
import { config } from "./config";
import { handleAutoCommit } from "./core/auto-commit";
import { generateCommitMessage } from "./core/ai";
import { getGitDiff } from "./core/git";
import { CommandOptions, CommitStyle } from "types";
import chalk from "chalk";

program
  .name("ai-commit")
  .description("Generate commit messages using AI")
  .option(
    "--auto",
    "Automatically commit the changes after generating the message",
    false
  )
  .option("--model <model>", "AI model to use", config.model)
  .option(
    "--all",
    "Use all git diff instead of just staged changes",
    config.useAllDiff
  )
  .option(
    "--max <maxLen>",
    "Maximum length of commit message",
    String(config.maxLen)
  )
  .option(
    "--style <style>",
    "Commit message style (conventional, gitmoji, etc.)",
    config.style
  );

program.action(async () => {
  const options = program.opts<CommandOptions>();

  const style = (options.style ?? config.style) as CommitStyle;
  const model = options.model ?? config.model;
  const useAllDiff = options.all ?? config.useAllDiff;
  const maxLen = Number(options.max ?? config.maxLen);
  const autoCommit = options.auto || config.autoCommit || false;

  console.log(chalk.green("🚀 AI Commit CLI"));
  console.log(chalk.blue(`📦 Using model: ${model}`));
  console.log(chalk.blue(`🎨 Commit style: ${style}`));
  console.log(chalk.blue(`📏 Max length: ${maxLen}`));
  console.log(chalk.blue(`📝 Use all diff: ${useAllDiff}`));
  console.log(chalk.blue(`🤖 Auto commit: ${autoCommit}`));

  if (autoCommit) {
    await handleAutoCommit({ style, options });
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

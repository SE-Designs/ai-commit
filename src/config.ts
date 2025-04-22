import fs from "fs";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import chalk from "chalk";
import { AICommitConfig } from "types";

dotenvConfig();

const defaultConfig: AICommitConfig = {
  autoCommit: false,
  model: "gpt-4",
  useAllDiff: false,
  maxLen: 80,
  style: "conventional",
  prompt: "",
  key: process.env.OPEN_ROUTER_API_KEY || process.env.OPENAI_API_KEY || "",
};

function loadConfigFromFile(filePath: string): Partial<AICommitConfig> | null {
  try {
    if (fs.existsSync(filePath)) {
      if (filePath.endsWith(".js")) {
        return require(filePath);
      }
    }
  } catch (error) {
    console.error(chalk.red("❌ Failed to load config file:"), error);
  }
  return null;
}

const configFilePath = path.resolve(process.cwd(), "ai-commit.config.js");
const userConfig = loadConfigFromFile(configFilePath);

const mergedConfig: AICommitConfig = {
  ...defaultConfig,
  ...userConfig,
};

// function validateConfig(cfg: AICommitConfig) {
//   const errors: string[] = [];

//   if (!cfg.key) errors.push("❌ Missing API key (OPEN_ROUTER_API_KEY in .env or `key` in config)");
//   if (!cfg.style) errors.push("❌ Missing commit style (e.g., conventional, gitmoji)");
//   if (!cfg.model) errors.push("❌ Missing model (e.g., gpt-4)");
//   if (!cfg.maxLen || typeof cfg.maxLen !== "number") errors.push("❌ maxLen must be a number");

//   if (errors.length) {
//     console.error(chalk.redBright("🚫 Invalid ai-commit.config.js:"));
//     for (const err of errors) {
//       console.error(chalk.red(err));
//     }
//     process.exit(1);
//   }
// }

// validateConfig(mergedConfig);

export const config = {
  baseURL: "https://openrouter.ai/api/v1",
  ...mergedConfig,
};

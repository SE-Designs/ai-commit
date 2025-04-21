import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { config as dotenvConfig } from "dotenv";
import { AICommitConfig } from "types";
import chalk from "chalk";

dotenvConfig();

let aiCommitConfig: AICommitConfig = {
  autoCommit: false,
  model: "gpt-4",
  useAllDiff: false,
  maxLen: 80,
  style: "conventional"
};

function loadConfigFromFile(filePath: string): AICommitConfig | null {
  try {
    if (fs.existsSync(filePath)) {
      const configFile = fs.readFileSync(filePath, "utf-8");
      if (filePath.endsWith(".json")) {
        return JSON.parse(configFile);
      } else if (filePath.endsWith(".js")) {
        return require(filePath);
      }
    }
  } catch (error) {
    console.error(chalk.red("❌ Failed in file config.ts:", error));
  }
  return null;
}

const configFilePath = path.resolve(process.cwd(), "ai-commit.config.json");
const loadedConfig = loadConfigFromFile(configFilePath);
if (loadedConfig) {
  aiCommitConfig = loadedConfig;
}

export const config = {
  openaiApiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  ...aiCommitConfig,
};

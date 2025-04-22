import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

function askStyle() {
  return new Promise<string>((resolve) => {
    console.log(`
    ✨ Select commit message style:
    1. conventional
    2. gitmoji
    3. emoji
    4. imperative
    5. simple
    6. detailed
    7. semver
    8. custom (extend with your own style)
    `);
    rl.question("Choose style number (default: 1): ", (answer) => {
      const styles = [
        "conventional",
        "gitmoji",
        "emoji",
        "imperative",
        "simple",
        "detailed",
        "semver",
        "custom",
      ];
      const selectedStyle = styles[parseInt(answer) - 1] || "conventional";
      resolve(selectedStyle);
    });
  });
}

export async function generateConfigFile() {
  const filePath = path.resolve(process.cwd(), "ai-commit.config.js");

  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Configuration file already exists. Overwriting..."));
  }

  const styleInput = await askStyle();
  const autoCommitInput = await askQuestion("🤖 Enable auto commit? (y/N): ");
  const useAllDiffInput = await askQuestion("📝 Use all git diff? (y/N): ");
  const maxLenInput = await askQuestion("📏 Max length (default: 80): ");
  const modelInput = await askQuestion("💡 AI model (default: gpt-4): ");
  const promptInput = await askQuestion("🧠 Custom prompt (default: \"\"): ");

  const autoCommit = autoCommitInput.toLowerCase() === "y" || false;
  const useAllDiff = useAllDiffInput.toLowerCase() === "y" || false;
  const maxLen = maxLenInput ? Number(maxLenInput) : 80;
  const model = modelInput || "gpt-4";
  const prompt = promptInput || "";

  const configObject = {
    autoCommit,
    useAllDiff,
    style: styleInput || "conventional",
    model: `${model}`,
    maxLen,
    key: "process.env.OPEN_ROUTER_API_KEY || process.env.OPENAI_API_KEY",
    prompt,
  };

  let configString = `// do not forget to set OPEN_ROUTER_API_KEY in your environment variables
// ai-commit.config.js
export default ${JSON.stringify(configObject, null, 2)};
`;

  configString = configString.replace(/"process\.env\.([A-Z0-9_]+) \|\| [^"]+"/g, (match) => {
    return match.replace(/^"/, "").replace(/"$/, "");
  });

  fs.writeFileSync(filePath, configString, "utf-8");
  rl.close();
  console.log(chalk.green("✅ ai-commit.config.js generated successfully."));
}

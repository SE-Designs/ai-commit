# 🧠 ai-commits

Automatic git commit message generation using AI (ChatGPT/GPT-4).  
Supports CLI, configuration, and git hook integration.

> NPM: [`@se-designs/ai-commit`](https://www.npmjs.com/package/@se-designs/ai-commit)

---

## 🚀 Installation

```bash
# One-time usage (no installation required)
npx @se-designs/ai-commit

# Alternative using pnpm
pnpm dlx @se-designs/ai-commit

# Global installation
npm install -g @se-designs/ai-commit

# After global installation
ai-commits


---

## 💻 Generate config file

```bash
@se-designs/ai-commit generate
```

---

## ⚙️ Configuration

```js
// do not forget to set OPEN_ROUTER_API_KEY in your environment variables
// ai-commit.config.js
export default {
  "autoCommit": false,
  "useAllDiff": false,
  "style": "emoji",
  "model": "gpt-3.5-turbo",
  "maxLen": 60,
  "key": process.env.OPEN_ROUTER_API_KEY || process.env.OPENAI_API_KEY,
  "prompt": ""
};

```

- `autoCommit` - Automatically commit (`git commit`).
- `useAllDiff` - Use `git diff` instead of `--cached`.
- `style` - Select one of these [STYLES.md](https://github.com/SE-Designs/ai-commit/blob/main/STYLES.md) 
- `model` - AI model: `gpt-4`, `gpt-3.5-turbo`, `anthropic/claude-3-haiku` etc.
- `maxLen` - Maximum length for the commit message.
- `key` - AI API KEY (you can get it from [OpenRouter](https://openrouter.ai/settings/keys) / [OpenAI](https://platform.openai.com/account/api-keys))
- `prompt` - custom prompt to extend the style of the commit message

---

## 🪝 Git Hook Integration (pre-commit)

Integration with [Husky](https://github.com/typicode/husky):

```bash
# Install husky
npx husky-init && npm install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx @se-designs/ai-commit"
```

Now, `@se-designs/ai-commit` will run on every commit.

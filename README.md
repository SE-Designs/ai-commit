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

## 💻 Usage

```bash
@se-designs/ai-commit [options]
```

### Examples

```bash
# Generate commit message for staged changes
@se-designs/ai-commit

# Use all changes (including unstaged)
@se-designs/ai-commit --all

# Specify model
@se-designs/ai-commit --model gpt-3.5-turbo

# Automatically make git commit
@se-designs/ai-commit --auto

# Set max commit message length
@se-designs/ai-commit --max 64
```

---

## ⚙️ Configuration

Create a configuration file `ai-commit.config.js` in the root of your project:

```js
{
  "autoCommit": false,
  "model": "gpt-4",
  "useAllDiff": false,
  "maxLen": 128,
  "style": "custom",
  "customPrompt": "Write a very short commit ...",
}
```

- `autoCommit` - Automatically commit (`git commit`).
- `model` - AI model: `gpt-4`, `gpt-3.5-turbo`, `anthropic/claude-3-haiku` etc.
- `useAllDiff` - Use `git diff` instead of `--cached`.
- `maxLen` - Maximum length for the commit message.

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

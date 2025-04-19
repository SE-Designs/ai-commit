
# 🧠 ai-commits

Automatic git commit message generation using AI (ChatGPT/GPT-4).  
Supports CLI, configuration, and git hook integration.

---

## 🚀 Installation

```bash
# One-time usage (no installation required)
npx ai-commits

# Alternative using pnpm
pnpm dlx ai-commits

# Global installation
npm install -g ai-commits

# After global installation
ai-commits
```

---

## 💻 Usage

```bash
ai-commits [options]
```

### Examples

```bash
# Generate commit message for staged changes
ai-commits

# Use all changes (including unstaged)
ai-commits --all

# Specify language and model
ai-commits --lang en --model gpt-3.5-turbo

# Automatically make git commit
ai-commits --auto

# Set max commit message length
ai-commits --max 64
```

---

## ⚙️ Configuration

Create a configuration file `ai-commit.config.js` in the root of your project:

```js
{
  "autoCommit": false,
  "model": "gpt-4",
  "useAllDiff": false,
  "maxLen": 128
}
```

### Parameters

| Parameter    | Type     | Description                                  |
|--------------|----------|----------------------------------------------|
| `autoCommit` | boolean  | Automatically commit (`git commit`)          |
| `model`      | string   | AI model: `gpt-4`, `gpt-3.5-turbo`, etc.    |
| `useAllDiff` | boolean  | Use `git diff` instead of `--cached`         |
| `maxLen`     | number   | Maximum length for the commit message       |

---

## 🪝 Git Hook Integration (pre-commit)

Integration with [Husky](https://github.com/typicode/husky):

```bash
# Install husky
npx husky-init && npm install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx ai-commits --commit"
```

Now, `ai-commits` will run on every commit.

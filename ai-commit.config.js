
// Do not forget to set OPEN_ROUTER_API_KEY in your environment variables
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

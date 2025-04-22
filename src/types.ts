export type CommitStyle =
  | "conventional"
  | "gitmoji"
  | "emoji"
  | "imperative"
  | "simple"
  | "detailed"
  | "semver"
  | "custom";

export type AICommitConfig = {
  autoCommit: boolean;
  model: string;
  useAllDiff: boolean;
  maxLen: number;
  style: CommitStyle
  prompt?: string;
  key?: string;
}

export type CommandOptions = {
  style: CommitStyle;
  auto: boolean;
  model: string;
  all: boolean;
  max: string;
}
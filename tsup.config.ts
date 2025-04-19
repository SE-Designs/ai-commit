import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts", "src/index.ts"],
  format: ["esm"],
  splitting: false,
  clean: true,
  dts: true,
  outDir: "dist",
  target: "node18",
  shims: false,
});

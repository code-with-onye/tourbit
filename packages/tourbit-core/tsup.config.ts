import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    ".": "src/index.tsx",
  },
  banner: {
    js: "'use client'",
  },
  format: ["cjs", "esm"],
  bundle: true,
  external: ["react", "@tourbit/eslint-config", "@tourbit/tsconfig"],
  dts: true,
  injectStyle: true,
});

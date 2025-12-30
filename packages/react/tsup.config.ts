import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx", "src/text-input.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options,
}));

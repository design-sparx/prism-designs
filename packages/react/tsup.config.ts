/**
 * tsup Build Configuration
 *
 * Auto-discovers components from src/components/ and builds them individually.
 *
 * Educational Notes:
 * - Auto-discovery eliminates manual config updates for new components
 * - Each component gets its own entry point for tree-shaking
 * - Outputs both CJS (.js) and ESM (.mjs) formats
 * - Generates TypeScript definitions (.d.ts)
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";

import { defineConfig } from "tsup";

/**
 * Auto-discover components
 *
 * Scans src/components/ and builds entry points automatically.
 * No need to manually update this config for each new component.
 */
function getComponentEntryPoints(): Record<string, string> {
  const componentsDir = join(__dirname, "src", "components");
  const componentFolders = readdirSync(componentsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const entry: Record<string, string> = {};
  componentFolders.forEach((folder) => {
    entry[folder] = `src/components/${folder}/index.ts`;
  });

  return entry;
}

export default defineConfig((options) => ({
  entry: getComponentEntryPoints(),
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  clean: true,
  ...options,
}));

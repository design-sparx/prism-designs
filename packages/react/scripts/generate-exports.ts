/**
 * Generate Package Exports
 *
 * Automatically generates package.json exports for all components.
 * Run this script when adding a new component.
 *
 * Educational Notes:
 * - Auto-discovery eliminates manual package.json updates
 * - Scans src/components/ for component folders
 * - Generates exports with proper types/import/require paths
 * - Maintains consistent export structure
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const componentsDir = join(__dirname, "..", "src", "components");
const packageJsonPath = join(__dirname, "..", "package.json");

// eslint-disable-next-line no-console -- Build script output
console.log("🔍 Scanning for components...");

// Get all component folders
const componentFolders = readdirSync(componentsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .sort(); // Alphabetical order

// eslint-disable-next-line no-console -- Build script output
console.log(
  `📦 Found ${componentFolders.length} components:`,
  componentFolders.join(", "),
);

// Generate exports object
const exports: Record<
  string,
  { types: string; import: string; require: string }
> = {};

componentFolders.forEach((folder) => {
  exports[`./${folder}`] = {
    types: `./dist/${folder}.d.ts`,
    import: `./dist/${folder}.mjs`,
    require: `./dist/${folder}.js`,
  };
});

// eslint-disable-next-line no-console -- Build script output
console.log("\n📝 Generated exports:");
// eslint-disable-next-line no-console -- Build script output
console.log(JSON.stringify(exports, null, 2));

// Read existing package.json
const packageJson = JSON.parse(
  readFileSync(packageJsonPath, "utf-8"),
) as Record<string, unknown>;

// Update exports
packageJson.exports = exports;

// Write back to package.json
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

// eslint-disable-next-line no-console -- Build script output
console.log(`\n✅ Updated ${packageJsonPath}`);
// eslint-disable-next-line no-console -- Build script output
console.log(`✨ Generated exports for ${componentFolders.length} component(s)`);

/**
 * Vitest Configuration for \@prism/react
 *
 * Configures the testing environment for React components.
 *
 * Educational Notes:
 * - Uses happy-dom for lightweight DOM simulation
 * - Configures React plugin for JSX transformation
 * - Sets up path aliases for monorepo dependencies
 * - Configures coverage thresholds (80%)
 */

import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  test: {
    // Test environment
    environment: "happy-dom",

    // Setup file for test environment initialization
    setupFiles: ["./src/test/setup.ts"],

    // Use globals (describe, it, expect) without imports
    globals: true,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: [
        "src/components/**/*.spec.{ts,tsx}",
        "src/components/**/*.mocks.{ts,tsx}",
        "src/components/**/index.ts",
        "src/test/**",
      ],
      // Educational target: 80% coverage
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // Watch mode options
    watch: false,
  },

  // Path resolution for monorepo workspace dependencies
  resolve: {
    alias: {
      "@prism/core": path.resolve(__dirname, "../core/src"),
      "@prism/tokens": path.resolve(__dirname, "../tokens/src"),
    },
  },
});

/**
 * Base Vitest Configuration
 *
 * Shared testing configuration for all Prism packages.
 *
 * Educational Notes:
 * - This config can be extended by package-specific configs
 * - Provides sensible defaults for test environment and coverage
 * - Keeps test configuration DRY across the monorepo
 */

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Test environment
    environment: "node",

    // Use globals (describe, it, expect) without imports
    globals: true,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      // Exclude common patterns
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.spec.{ts,tsx}",
        "**/*.test.{ts,tsx}",
        "**/*.mocks.{ts,tsx}",
        "**/index.ts",
        "**/*.config.{ts,js}",
      ],
    },

    // Watch mode options
    watch: false,
  },
});

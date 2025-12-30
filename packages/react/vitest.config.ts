/**
 * Vitest Configuration for \@prism/react
 *
 * Extends the shared React testing configuration with package-specific settings.
 *
 * Educational Notes:
 * - Extends prism/vitest-config/react for base React testing setup
 * - Adds path aliases for monorepo workspace dependencies
 * - Overrides setupFiles path to point to this package's test setup
 * - Demonstrates config composition in a monorepo
 */

import path from "node:path";

import { defineConfig, mergeConfig } from "vitest/config";

import reactConfig from "@prism/vitest-config/react";

export default mergeConfig(
  reactConfig,
  defineConfig({
    test: {
      // Override the setup file path to point to this package's test setup
      setupFiles: ["./src/test/setup.ts"],

      // Override coverage include/exclude for this package
      coverage: {
        include: ["src/components/**/*.{ts,tsx}"],
        exclude: [
          "src/components/**/*.spec.{ts,tsx}",
          "src/components/**/*.mocks.{ts,tsx}",
          "src/components/**/index.ts",
          "src/test/**",
        ],
      },
    },

    // Path resolution for monorepo workspace dependencies
    resolve: {
      alias: {
        "@prism/core": path.resolve(__dirname, "../core/src"),
        "@prism/tokens": path.resolve(__dirname, "../tokens/src"),
      },
    },
  }),
);

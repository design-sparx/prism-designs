/**
 * React Vitest Configuration
 *
 * Specialized configuration for testing React components.
 *
 * Educational Notes:
 * - Extends base.ts with React-specific settings
 * - Uses happy-dom for lightweight DOM simulation
 * - Configures React plugin for JSX transformation
 * - Sets up test utilities and coverage thresholds
 */

import { defineConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import baseConfig from "./base.ts";

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],

    test: {
      // Use happy-dom for React component testing
      // Faster and lighter than jsdom
      environment: "happy-dom",

      // Setup file for test environment initialization
      // Override this in package-specific vitest.config.ts
      setupFiles: ["./src/test/setup.ts"],

      // Coverage thresholds for React components
      // Educational target: 80% coverage
      coverage: {
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
        // React-specific includes
        include: ["src/components/**/*.{ts,tsx}"],
      },

      // Globals enabled for describe/it/expect
      globals: true,
    },
  }),
);

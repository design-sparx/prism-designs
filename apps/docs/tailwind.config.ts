import type { Config } from "tailwindcss";

/**
 * Tailwind Configuration for Storybook
 *
 * This tells Tailwind where to scan for class names.
 * It needs to scan both our stories and the @prism/react components.
 */
const config: Config = {
  content: [
    "./stories/**/*.{ts,tsx}",
    "../../packages/react/src/**/*.{ts,tsx}",
    "../../packages/react/dist/**/*.{js,mjs}",
  ],
};

export default config;

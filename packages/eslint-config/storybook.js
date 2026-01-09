const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    "plugin:storybook/recommended",
    "plugin:mdx/recommended",
    ...[
      "@vercel/style-guide/eslint/node",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/react",
    ].map(require.resolve),
    "prettier",
  ],
  parserOptions: {
    project,
  },
  plugins: ["only-warn", "simple-import-sort"],
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ["node_modules/", "dist/", "*.config.js", "*.config.ts"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "import/order": "off", // Disabled in favor of simple-import-sort
    // Import sorting rules
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Node.js built-ins
          ["^node:"],
          // React and external packages
          ["^react$", "^@?\\w"],
          // Internal packages (@prism/*)
          ["^@prism/"],
          // Parent imports (../)
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Relative imports (./)
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    // Relax TypeScript rules for story files (they're for documentation/demos)
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "react/no-unstable-nested-components": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};

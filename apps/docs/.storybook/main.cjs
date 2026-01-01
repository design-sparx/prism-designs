const { dirname, join, resolve } = require("path");

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: [
    "../stories/Introduction.mdx",
    "../stories/*.stories.tsx",
    "../stories/**/*.stories.tsx",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    "storybook-dark-mode", // Dark/light mode for entire Storybook UI
    getAbsolutePath("@storybook/addon-a11y"), // Accessibility testing addon
    getAbsolutePath("@storybook/addon-interactions"), // Interaction testing
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  core: {},

  async viteFinal(config, { configType }) {
    // Import the Tailwind Vite plugin
    const tailwindcss = (await import("@tailwindcss/vite")).default;

    // Merge Tailwind plugin with Storybook's Vite config
    return {
      ...config,
      define: { "process.env": {} },
      plugins: [...(config.plugins || []), tailwindcss()],
      resolve: {
        alias: [
          {
            find: "@prism/tokens",
            replacement: resolve(
              __dirname,
              "../../../packages/tokens/src/index.ts",
            ),
          },
          {
            find: "@prism/core",
            replacement: resolve(
              __dirname,
              "../../../packages/core/src/index.ts",
            ),
          },
          {
            find: "@prism/react/badge",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/badge/index.ts",
            ),
          },
          {
            find: "@prism/react/button",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/button/index.ts",
            ),
          },
          {
            find: "@prism/react/card",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/card/index.ts",
            ),
          },
          {
            find: "@prism/react/input",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/input/index.ts",
            ),
          },
          {
            find: "@prism/react/label",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/label/index.ts",
            ),
          },
          {
            find: "@prism/react/select",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/select/index.ts",
            ),
          },
          {
            find: "@prism/react",
            replacement: resolve(__dirname, "../../../packages/react/src"),
          },
        ],
      },
    };
  },

  docs: {
    autodocs: true,
  },
};

module.exports = config;

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
            find: "@prism/react/accordion",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/accordion/index.ts",
            ),
          },
          {
            find: "@prism/react/tabs",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/tabs/index.ts",
            ),
          },
          {
            find: "@prism/react/toast",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/toast/index.ts",
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
            find: "@prism/react/calendar",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/calendar/index.ts",
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
            find: "@prism/react/checkbox",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/checkbox/index.ts",
            ),
          },
          {
            find: "@prism/react/command",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/command/index.ts",
            ),
          },
          {
            find: "@prism/react/date-picker",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/date-picker/index.ts",
            ),
          },
          {
            find: "@prism/react/dialog",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/dialog/index.ts",
            ),
          },
          {
            find: "@prism/react/dropdown-menu",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/dropdown-menu/index.ts",
            ),
          },
          {
            find: "@prism/react/tooltip",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/tooltip/index.ts",
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
            find: "@prism/react/popover",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/popover/index.ts",
            ),
          },
          {
            find: "@prism/react/progress",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/progress/index.ts",
            ),
          },
          {
            find: "@prism/react/radio-group",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/radio-group/index.ts",
            ),
          },
          {
            find: "@prism/react/slider",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/slider/index.ts",
            ),
          },
          {
            find: "@prism/react/spinner",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/spinner/index.ts",
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
            find: "@prism/react/switch",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/switch/index.ts",
            ),
          },
          {
            find: "@prism/react/textarea",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/textarea/index.ts",
            ),
          },
          {
            find: "@prism/react/toggle",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/toggle/index.ts",
            ),
          },
          {
            find: "@prism/react/toggle-group",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/toggle-group/index.ts",
            ),
          },
          {
            find: "@prism/react/alert",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/alert/index.ts",
            ),
          },
          {
            find: "@prism/react/alert-dialog",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/alert-dialog/index.ts",
            ),
          },
          {
            find: "@prism/react/avatar",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/avatar/index.ts",
            ),
          },
          {
            find: "@prism/react/breadcrumb",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/breadcrumb/index.ts",
            ),
          },
          {
            find: "@prism/react/separator",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/separator/index.ts",
            ),
          },
          {
            find: "@prism/react/sheet",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/sheet/index.ts",
            ),
          },
          {
            find: "@prism/react/skeleton",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/skeleton/index.ts",
            ),
          },
          {
            find: "@prism/react/typography",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/components/typography/index.ts",
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

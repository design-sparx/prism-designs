import { dirname, join, resolve } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

const config = {
  stories: ["../stories/*.stories.tsx", "../stories/**/*.stories.tsx"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
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
            find: "@prism/react/button",
            replacement: resolve(
              __dirname,
              "../../../packages/react/src/button.tsx",
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

export default config;

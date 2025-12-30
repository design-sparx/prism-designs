import type { Preview } from "@storybook/react";
import "./prism.css";

const preview: Preview = {
  parameters: {
    // Enhanced control matchers for better prop inference
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Expand controls panel by default
    },

    // Background options for testing components on different surfaces
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "gray",
          value: "#f3f4f6",
        },
        {
          name: "dark",
          value: "#1f2937",
        },
        {
          name: "prism-gradient",
          value: "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
        },
      ],
    },

    // Viewport options for responsive testing
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
        wide: {
          name: "Wide",
          styles: {
            width: "1920px",
            height: "1080px",
          },
        },
      },
    },

    // Action logging for event handlers
    actions: { argTypesRegex: "^on[A-Z].*" },

    // Documentation options
    docs: {
      toc: true, // Enable table of contents
      source: {
        state: "open", // Show code by default
      },
    },

    // Layout options
    layout: "centered", // Center components by default

    // Sort stories alphabetically
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundation",
          ["Design Tokens", "Colors", "Typography", "Spacing"],
          "Components",
          ["Button", "TextInput", "*"],
          "Patterns",
          "*",
        ],
      },
    },
  },

  // Global decorators
  decorators: [
    (Story) => (
      <div style={{ fontFamily: "Inter, sans-serif" }}>
        <Story />
      </div>
    ),
  ],

  // Global tags
  tags: ["autodocs"],
};

export default preview;

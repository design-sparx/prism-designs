import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

// Create a custom Prism theme for Storybook UI
const prismTheme = create({
  base: "light",

  // Brand
  brandTitle: "Prism Design System",
  brandUrl: "https://github.com/design-sparx/prism",
  brandTarget: "_blank",

  // Colors - Using a purple gradient theme to match educational/creative vibe
  colorPrimary: "#667eea",
  colorSecondary: "#764ba2",

  // UI
  appBg: "#f8f9fa",
  appContentBg: "#ffffff",
  appBorderColor: "#e5e7eb",
  appBorderRadius: 8,

  // Typography
  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "Consolas", "Monaco", monospace',

  // Text colors
  textColor: "#1f2937",
  textInverseColor: "#ffffff",
  textMutedColor: "#6b7280",

  // Toolbar default and active colors
  barTextColor: "#6b7280",
  barSelectedColor: "#667eea",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#d1d5db",
  inputTextColor: "#1f2937",
  inputBorderRadius: 6,
});

// Configure Storybook manager
addons.setConfig({
  theme: prismTheme,

  // Panel position
  panelPosition: "bottom",

  // Enable shortcuts
  enableShortcuts: true,

  // Show toolbar
  showToolbar: true,

  // Sidebar settings
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },

  // Toolbar items
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});

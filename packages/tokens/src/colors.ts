/**
 * Color Tokens
 *
 * Why separate color tokens?
 * - Single source of truth for all colors
 * - Easy to update brand colors globally
 * - Enables theming (light/dark modes)
 * - Type-safe color references
 */

export const colors = {
  // Primary brand colors
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // Neutral/gray colors
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Semantic colors
  success: {
    light: "#10b981",
    main: "#059669",
    dark: "#047857",
  },

  error: {
    light: "#ef4444",
    main: "#dc2626",
    dark: "#b91c1c",
  },

  warning: {
    light: "#f59e0b",
    main: "#d97706",
    dark: "#b45309",
  },

  info: {
    light: "#3b82f6",
    main: "#2563eb",
    dark: "#1d4ed8",
  },
} as const;

export type ColorToken = typeof colors;

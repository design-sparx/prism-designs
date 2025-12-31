/**
 * Size Tokens
 *
 * Why use size tokens?
 * - Consistent component dimensions (buttons, inputs, icons)
 * - Creates visual rhythm and proportions
 * - Makes it easy to resize components globally
 * - Reduces arbitrary sizing decisions
 *
 * Educational Note:
 * - Used for heights of buttons, inputs, and other controls
 * - Icon sizes should align with component heights
 * - Larger sizes for touch targets on mobile
 * - Container widths use different scale (full, prose, etc.)
 */

export const sizes = {
  // Component heights (buttons, inputs, etc.)
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  20: "5rem", // 80px

  // Icon sizes
  "icon-xs": "1rem", // 16px
  "icon-sm": "1.25rem", // 20px
  "icon-md": "1.5rem", // 24px
  "icon-lg": "2rem", // 32px
  "icon-xl": "2.5rem", // 40px

  // Common component sizes
  "button-sm": "2rem", // 32px height
  "button-md": "2.5rem", // 40px height
  "button-lg": "3rem", // 48px height

  // Container widths
  full: "100%",
  screen: "100vw",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",

  // Content widths
  xs: "20rem", // 320px
  sm: "24rem", // 384px
  md: "28rem", // 448px
  lg: "32rem", // 512px
  xl: "36rem", // 576px
  "2xl": "42rem", // 672px
  "3xl": "48rem", // 768px
  "4xl": "56rem", // 896px
  "5xl": "64rem", // 1024px
  "6xl": "72rem", // 1152px
  "7xl": "80rem", // 1280px

  // Special widths
  prose: "65ch", // Optimal reading width
} as const;

export type SizeToken = typeof sizes;

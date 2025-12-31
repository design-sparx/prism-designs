/**
 * Transition Tokens
 *
 * Why use transition tokens?
 * - Consistent animation timing across components
 * - Creates smooth, predictable interactions
 * - Easy to adjust global animation speed
 * - Performance-optimized values
 *
 * Educational Note:
 * - Duration: How long the animation takes
 * - Timing: The easing curve (how it accelerates/decelerates)
 * - 'fast' for micro-interactions (hover states)
 * - 'base' for standard UI transitions
 * - 'slow' for larger movements (modals, drawers)
 */

export const transitions = {
  /**
   * Transition Durations
   *
   * Controls animation speed
   */
  duration: {
    fast: "150ms", // Quick micro-interactions
    base: "200ms", // Standard transitions
    slow: "300ms", // Larger movements
    slower: "500ms", // Very slow animations
  },

  /**
   * Timing Functions (Easing)
   *
   * Controls acceleration curve
   * - ease-in: Starts slow, ends fast (good for exits)
   * - ease-out: Starts fast, ends slow (good for entrances)
   * - ease-in-out: Slow at both ends (smooth feel)
   */
  timing: {
    linear: "linear",
    "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
    "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
    "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  /**
   * Common Transition Properties
   *
   * Which CSS properties to animate
   */
  property: {
    none: "none",
    all: "all",
    colors: "color, background-color, border-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform",
  },
} as const;

export type TransitionToken = typeof transitions;

/**
 * Test Utilities
 *
 * Provides custom render functions and helpers for testing React components.
 *
 * Educational Notes:
 * - Custom render wraps components with necessary providers
 * - Re-export everything from \@testing-library/react for convenience
 * - Add custom utilities as the design system grows (theme provider, router, etc.)
 */

import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

/**
 * Custom render function
 *
 * Currently a simple wrapper around Testing Library's render,
 * but can be extended to:
 * - Wrap with ThemeProvider (if added)
 * - Add router context
 * - Mock global state
 * - Provide default props
 *
 * \@example
 * ```tsx
 * import { render, screen } from '../test/utils';
 *
 * render(<Button>Click me</Button>);
 * expect(screen.getByRole('button')).toBeInTheDocument();
 * ```
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> {
  return render(ui, { ...options });
}

// Re-export everything from @testing-library/react
export * from "@testing-library/react";

// Export userEvent separately (default export)
export { default as userEvent } from "@testing-library/user-event";

// Override render method with our custom version
export { customRender as render };

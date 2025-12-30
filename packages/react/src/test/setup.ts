/**
 * Test Environment Setup
 *
 * Configures the test environment with:
 * - \@testing-library/jest-dom matchers
 * - DOM polyfills and mocks
 *
 * Educational Notes:
 * - This file runs before each test suite
 * - Add global test utilities here
 * - Configure mocks for external dependencies
 */

import "@testing-library/jest-dom";

/**
 * Mock window.matchMedia
 *
 * Required for components that use media queries or responsive behavior.
 * happy-dom doesn't include matchMedia by default.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
    addListener: (): void => {}, // Deprecated
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
    removeListener: (): void => {}, // Deprecated
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
    addEventListener: (): void => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
    removeEventListener: (): void => {},
    dispatchEvent: (): boolean => false,
  }),
});

/**
 * Mock window.ResizeObserver
 *
 * Some components may use ResizeObserver for responsive behavior.
 * Provide a basic mock to prevent errors during tests.
 */
global.ResizeObserver = class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
  observe(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
  unobserve(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function -- Mock method
  disconnect(): void {}
};

/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import type { Meta, StoryObj } from "@storybook/react";

import { typography } from "@prism/tokens";

/**
 * Typography Tokens
 *
 * Font families, sizes, weights, and line heights for consistent text styling.
 */

const meta: Meta = {
  title: "Theme/Typography",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * Font Families
 *
 * System font stacks for different text types.
 */
export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-600">Sans</h4>
        <p
          className="text-lg"
          style={{ fontFamily: typography.fontFamily.sans }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="mt-1 font-mono text-xs text-neutral-500">
          {typography.fontFamily.sans}
        </p>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-600">Serif</h4>
        <p
          className="text-lg"
          style={{ fontFamily: typography.fontFamily.serif }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="mt-1 font-mono text-xs text-neutral-500">
          {typography.fontFamily.serif}
        </p>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-600">Mono</h4>
        <p
          className="text-lg"
          style={{ fontFamily: typography.fontFamily.mono }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="mt-1 font-mono text-xs text-neutral-500">
          {typography.fontFamily.mono}
        </p>
      </div>
    </div>
  ),
};

/**
 * Font Sizes
 *
 * Type scale from xs to 5xl.
 */
export const FontSizes: Story = {
  render: () => (
    <div className="space-y-4">
      {Object.entries(typography.fontSize).map(([key, value]) => (
        <div key={key} className="flex items-baseline gap-4">
          <span className="w-16 font-mono text-sm text-neutral-600">{key}</span>
          <p style={{ fontSize: value }}>
            The quick brown fox jumps over the lazy dog
          </p>
          <span className="ml-auto font-mono text-xs text-neutral-500">
            {value}
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Font Weights
 *
 * Available font weight options.
 */
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4">
      {Object.entries(typography.fontWeight).map(([key, value]) => (
        <div key={key} className="flex items-baseline gap-4">
          <span className="w-24 font-mono text-sm text-neutral-600">{key}</span>
          <p className="text-lg" style={{ fontWeight: value }}>
            The quick brown fox jumps over the lazy dog
          </p>
          <span className="ml-auto font-mono text-xs text-neutral-500">
            {value}
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Line Heights
 *
 * Line height values for different text densities.
 */
export const LineHeights: Story = {
  render: () => (
    <div className="space-y-6">
      {Object.entries(typography.lineHeight).map(([key, value]) => (
        <div key={key}>
          <div className="mb-2 flex items-center gap-4">
            <span className="font-mono text-sm font-semibold text-neutral-900">
              {key}
            </span>
            <span className="font-mono text-xs text-neutral-500">{value}</span>
          </div>
          <div className="rounded border border-neutral-300 bg-neutral-50 p-4">
            <p className="text-sm" style={{ lineHeight: value }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Typography Examples
 *
 * Common text patterns using typography tokens.
 */
export const Examples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Headings</h3>
        <div className="space-y-2">
          <h1 className="text-5xl font-bold">Heading 1 (5xl, bold)</h1>
          <h2 className="text-4xl font-bold">Heading 2 (4xl, bold)</h2>
          <h3 className="text-3xl font-semibold">Heading 3 (3xl, semibold)</h3>
          <h4 className="text-2xl font-semibold">Heading 4 (2xl, semibold)</h4>
          <h5 className="text-xl font-medium">Heading 5 (xl, medium)</h5>
          <h6 className="text-lg font-medium">Heading 6 (lg, medium)</h6>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Body Text</h3>
        <div className="space-y-4">
          <p className="text-base leading-normal">
            Regular body text (base size, normal line height). This is the
            default text size for most content.
          </p>
          <p className="text-sm leading-relaxed">
            Smaller body text (sm size, relaxed line height). Often used for
            secondary information or captions.
          </p>
          <p className="text-xs leading-loose">
            Extra small text (xs size, loose line height). Typically used for
            labels, hints, or metadata.
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Code & Monospace</h3>
        <pre className="rounded-lg bg-neutral-900 p-4 font-mono text-sm text-white">
          {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
        </pre>
      </div>
    </div>
  ),
};

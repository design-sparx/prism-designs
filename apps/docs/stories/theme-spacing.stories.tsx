/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import type { Meta, StoryObj } from "@storybook/react";

import { spacing } from "@prism/tokens";

/**
 * Spacing Tokens
 *
 * Consistent spacing values based on a 4px/8px grid system.
 * Use these for margins, padding, and gaps to create visual rhythm.
 */

const meta: Meta = {
  title: "Theme/Spacing",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const SpacingDemo = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): React.ReactElement => (
  <div className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4">
    <div className="flex flex-col gap-2">
      <div className="font-semibold text-neutral-900">spacing-{name}</div>
      <div className="font-mono text-sm text-neutral-600">{value}</div>
    </div>
    <div className="ml-auto">
      <div className="bg-primary-500 h-8" style={{ width: value }} />
    </div>
  </div>
);

/**
 * All Spacing Values
 *
 * Complete spacing scale from 0 to 24.
 */
export const AllSpacing: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(spacing).map(([key, value]) => (
        <SpacingDemo key={key} name={key} value={value} />
      ))}
    </div>
  ),
};

/**
 * Spacing Scale
 *
 * Visual representation of the spacing scale progression.
 */
export const SpacingScale: Story = {
  render: () => (
    <div className="space-y-4">
      {Object.entries(spacing).map(([key, value]) => (
        <div key={key} className="flex items-center gap-4">
          <span className="w-12 font-mono text-sm text-neutral-600">{key}</span>
          <div
            className="bg-primary-500 h-8 rounded"
            style={{ width: value }}
          />
          <span className="font-mono text-sm text-neutral-600">{value}</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Spacing Examples
 *
 * Common use cases for spacing tokens.
 */
export const Examples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Padding (p-6)</h3>
        <div className="inline-block rounded-lg border border-neutral-300 bg-neutral-50 p-6">
          <div className="bg-primary-500 rounded p-4 text-white">
            Content with p-6 (1.5rem / 24px)
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Margin (space-y-4)</h3>
        <div className="rounded-lg border border-neutral-300 bg-neutral-50 p-4">
          <div className="space-y-4">
            <div className="bg-primary-500 rounded p-4 text-white">Item 1</div>
            <div className="bg-primary-500 rounded p-4 text-white">Item 2</div>
            <div className="bg-primary-500 rounded p-4 text-white">Item 3</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Gap (gap-2)</h3>
        <div className="inline-flex gap-2 rounded-lg border border-neutral-300 bg-neutral-50 p-4">
          <div className="bg-primary-500 rounded p-4 text-white">Item 1</div>
          <div className="bg-primary-500 rounded p-4 text-white">Item 2</div>
          <div className="bg-primary-500 rounded p-4 text-white">Item 3</div>
        </div>
      </div>
    </div>
  ),
};

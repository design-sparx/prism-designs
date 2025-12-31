/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import type { Meta, StoryObj } from "@storybook/react";

import { borderRadius } from "@prism/tokens";

/**
 * Border Radius Tokens
 *
 * Consistent rounded corners across components.
 * Use these tokens to maintain a cohesive visual style.
 */

const meta: Meta = {
  title: "Theme/Border Radius",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const RadiusDemo = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): React.ReactElement => (
  <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-200 p-6">
    <div className="bg-primary-500 h-24 w-24" style={{ borderRadius: value }} />
    <div className="text-center">
      <div className="font-semibold text-neutral-900">{name}</div>
      <div className="font-mono text-sm text-neutral-600">{value}</div>
    </div>
  </div>
);

/**
 * All Border Radius Values
 *
 * Visual representation of all available border radius tokens.
 */
export const AllRadii: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Object.entries(borderRadius).map(([key, value]) => (
        <RadiusDemo key={key} name={key} value={value} />
      ))}
    </div>
  ),
};

/**
 * Border Radius Examples
 *
 * Common use cases for different border radius values.
 */
export const Examples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Buttons & Cards (lg)</h3>
        <div className="flex gap-4">
          <button
            className="bg-primary-500 rounded-lg px-6 py-3 text-white"
            type="button"
          >
            Button
          </button>
          <div className="rounded-lg border border-neutral-300 bg-white p-6 shadow-sm">
            <p className="text-sm">Card with lg radius</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Badges & Tags (full)</h3>
        <div className="flex gap-2">
          <span className="bg-primary-500 rounded-full px-3 py-1 text-xs text-white">
            Badge
          </span>
          <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs text-neutral-900">
            Tag
          </span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Inputs (md)</h3>
        <input
          className="rounded-md border border-neutral-300 px-4 py-2"
          placeholder="Input with md radius"
          type="text"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">No Radius (none)</h3>
        <div className="rounded-none border border-neutral-300 bg-white p-6">
          <p className="text-sm">Sharp corners, no border radius</p>
        </div>
      </div>
    </div>
  ),
};

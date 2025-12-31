/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import type { Meta, StoryObj } from "@storybook/react";

import { shadows } from "@prism/tokens";

/**
 * Shadow Tokens
 *
 * Elevation and depth values that create visual hierarchy.
 * Use shadows sparingly to distinguish interactive elements.
 */

const meta: Meta = {
  title: "Theme/Shadows",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ShadowDemo = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): React.ReactElement => (
  <div className="flex flex-col items-center gap-4 rounded-lg border border-neutral-100 bg-neutral-50 p-8">
    <div
      className="h-32 w-32 rounded-lg bg-white"
      style={{ boxShadow: value }}
    />
    <div className="text-center">
      <div className="font-semibold text-neutral-900">{name}</div>
      <div className="max-w-xs font-mono text-xs break-words text-neutral-600">
        {value}
      </div>
    </div>
  </div>
);

/**
 * All Shadow Values
 *
 * Visual representation of all available shadow tokens.
 */
export const AllShadows: Story = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(shadows).map(([key, value]) => (
        <ShadowDemo key={key} name={key} value={value} />
      ))}
    </div>
  ),
};

/**
 * Shadow Examples
 *
 * Common use cases for different shadow values.
 */
export const Examples: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Cards (sm)</h3>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-600">
            Subtle shadow for cards and panels
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Dropdowns (md)</h3>
        <div className="inline-block rounded-lg border border-neutral-200 bg-white p-4 shadow-md">
          <ul className="space-y-2 text-sm">
            <li>Menu Item 1</li>
            <li>Menu Item 2</li>
            <li>Menu Item 3</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Modals (lg)</h3>
        <div className="inline-block rounded-lg bg-white p-8 shadow-lg">
          <h4 className="mb-2 text-lg font-semibold">Modal Title</h4>
          <p className="text-sm text-neutral-600">
            Modal content with larger shadow for more depth
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Popovers (xl)</h3>
        <div className="inline-block rounded-lg bg-white p-6 shadow-xl">
          <p className="text-sm text-neutral-600">
            Floating element with extra large shadow
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Shadow Elevation Scale
 *
 * Demonstrates how shadows create visual hierarchy.
 */
export const ElevationScale: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-8">
      <div className="flex flex-col items-center gap-4">
        <div className="h-20 w-20 rounded-lg bg-white shadow-none" />
        <span className="text-sm font-medium">none</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="h-24 w-24 rounded-lg bg-white shadow-sm" />
        <span className="text-sm font-medium">sm</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="h-28 w-28 rounded-lg bg-white shadow-md" />
        <span className="text-sm font-medium">md</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="h-32 w-32 rounded-lg bg-white shadow-lg" />
        <span className="text-sm font-medium">lg</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="h-36 w-36 rounded-lg bg-white shadow-xl" />
        <span className="text-sm font-medium">xl</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="h-40 w-40 rounded-lg bg-white shadow-2xl" />
        <span className="text-sm font-medium">2xl</span>
      </div>
    </div>
  ),
};

/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import type { Meta, StoryObj } from "@storybook/react";

import { colors } from "@prism/tokens";

/**
 * Color Tokens
 *
 * Our color palette consists of primary brand colors, neutral grays,
 * and semantic colors for different UI states.
 */

const meta: Meta = {
  title: "Theme/Colors",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const ColorSwatch = ({
  name,
  value,
}: {
  name: string;
  value: string;
}): React.ReactElement => (
  <div className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4">
    <div
      className="h-16 w-16 flex-shrink-0 rounded-lg border border-neutral-300 shadow-sm"
      style={{ backgroundColor: value }}
    />
    <div>
      <div className="font-semibold text-neutral-900">{name}</div>
      <div className="font-mono text-sm text-neutral-600">{value}</div>
    </div>
  </div>
);

/**
 * Primary Colors
 *
 * Main brand colors used for primary actions, links, and focus states.
 */
export const Primary: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors.primary).map(([key, value]) => (
        <ColorSwatch key={key} name={`primary-${key}`} value={value} />
      ))}
    </div>
  ),
};

/**
 * Neutral Colors
 *
 * Grayscale palette for text, backgrounds, borders, and shadows.
 */
export const Neutral: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors.neutral).map(([key, value]) => (
        <ColorSwatch key={key} name={`neutral-${key}`} value={value} />
      ))}
    </div>
  ),
};

/**
 * Success Colors
 *
 * Green shades for success states, confirmations, and positive actions.
 */
export const Success: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors.success).map(([key, value]) => (
        <ColorSwatch key={key} name={`success-${key}`} value={value} />
      ))}
    </div>
  ),
};

/**
 * Error Colors
 *
 * Red shades for error states, warnings, and destructive actions.
 */
export const Error: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors.error).map(([key, value]) => (
        <ColorSwatch key={key} name={`error-${key}`} value={value} />
      ))}
    </div>
  ),
};

/**
 * Warning Colors
 *
 * Orange/yellow shades for warning states and caution indicators.
 */
export const Warning: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors.warning).map(([key, value]) => (
        <ColorSwatch key={key} name={`warning-${key}`} value={value} />
      ))}
    </div>
  ),
};

/**
 * Info Colors
 *
 * Blue shades for informational states and neutral notifications.
 */
export const Info: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(colors.info).map(([key, value]) => (
        <ColorSwatch key={key} name={`info-${key}`} value={value} />
      ))}
    </div>
  ),
};

/**
 * All Colors
 *
 * Complete color palette overview.
 */
export const AllColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Primary</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors.primary).map(([key, value]) => (
            <ColorSwatch key={key} name={`primary-${key}`} value={value} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Neutral</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors.neutral).map(([key, value]) => (
            <ColorSwatch key={key} name={`neutral-${key}`} value={value} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Semantic Colors</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(colors.success).map(([key, value]) => (
            <ColorSwatch key={key} name={`success-${key}`} value={value} />
          ))}
          {Object.entries(colors.error).map(([key, value]) => (
            <ColorSwatch key={key} name={`error-${key}`} value={value} />
          ))}
          {Object.entries(colors.warning).map(([key, value]) => (
            <ColorSwatch key={key} name={`warning-${key}`} value={value} />
          ))}
          {Object.entries(colors.info).map(([key, value]) => (
            <ColorSwatch key={key} name={`info-${key}`} value={value} />
          ))}
        </div>
      </div>
    </div>
  ),
};

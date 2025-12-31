/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import type { Meta, StoryObj } from "@storybook/react";

import { sizes } from "@prism/tokens";

/**
 * Size Tokens
 *
 * Consistent dimensions for components, icons, and containers.
 * Includes button heights, icon sizes, and container widths.
 */

const meta: Meta = {
  title: "Theme/Sizes",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * Component Heights
 *
 * Standard heights for buttons, inputs, and other interactive elements.
 */
export const ComponentHeights: Story = {
  render: () => (
    <div className="space-y-4">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20].map((key) => (
        <div key={key} className="flex items-center gap-4">
          <span className="w-12 font-mono text-sm text-neutral-600">{key}</span>
          <div
            className="bg-primary-500 rounded"
            style={{ height: sizes[key as keyof typeof sizes], width: "200px" }}
          />
          <span className="font-mono text-sm text-neutral-600">
            {sizes[key as keyof typeof sizes]}
          </span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Icon Sizes
 *
 * Predefined sizes for icons that align with component heights.
 */
export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {["icon-xs", "icon-sm", "icon-md", "icon-lg", "icon-xl"].map((key) => (
        <div key={key} className="flex flex-col items-center gap-4">
          <div
            className="bg-primary-500 rounded"
            style={{
              height: sizes[key as keyof typeof sizes],
              width: sizes[key as keyof typeof sizes],
            }}
          />
          <div className="text-center">
            <div className="font-semibold text-neutral-900">{key}</div>
            <div className="font-mono text-xs text-neutral-600">
              {sizes[key as keyof typeof sizes]}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Button Sizes
 *
 * Standard button heights for consistency.
 */
export const ButtonSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {["button-sm", "button-md", "button-lg"].map((key) => (
        <div key={key} className="flex flex-col items-center gap-4">
          <button
            className="bg-primary-500 rounded-lg px-6 text-white"
            style={{ height: sizes[key as keyof typeof sizes] }}
            type="button"
          >
            {key}
          </button>
          <div className="text-center">
            <div className="font-semibold text-neutral-900">{key}</div>
            <div className="font-mono text-xs text-neutral-600">
              {sizes[key as keyof typeof sizes]}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Container Widths
 *
 * Predefined widths for content containers and layouts.
 */
export const ContainerWidths: Story = {
  render: () => (
    <div className="space-y-4">
      {[
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ].map((key) => (
        <div key={key}>
          <div className="mb-2 flex items-center gap-4">
            <span className="w-12 font-mono text-sm font-semibold text-neutral-900">
              {key}
            </span>
            <span className="font-mono text-sm text-neutral-600">
              {sizes[key as keyof typeof sizes]}
            </span>
          </div>
          <div
            className="bg-primary-100 h-8 rounded"
            style={{ width: sizes[key as keyof typeof sizes] }}
          />
        </div>
      ))}
    </div>
  ),
};

/**
 * Special Widths
 *
 * Utility size tokens for specific use cases.
 */
export const SpecialWidths: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 font-semibold">full (100%)</h4>
        <div className="bg-primary-500 h-8 w-full rounded" />
      </div>

      <div>
        <h4 className="mb-2 font-semibold">
          prose (65ch) - Optimal reading width
        </h4>
        <div className="rounded border border-neutral-300 bg-neutral-50 p-6">
          <div className="prose">
            <p className="text-sm text-neutral-600">
              This container uses the &apos;prose&apos; width (65 characters),
              which is considered optimal for reading comfort. Text lines that
              are too long or too short can reduce readability.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-semibold">min/max/fit - Content-based</h4>
        <div className="flex gap-4">
          <div className="bg-primary-500 w-min rounded px-4 py-2 text-white">
            min-content
          </div>
          <div className="bg-primary-500 w-max rounded px-4 py-2 text-white">
            max-content
          </div>
          <div className="bg-primary-500 w-fit rounded px-4 py-2 text-white">
            fit-content
          </div>
        </div>
      </div>
    </div>
  ),
};

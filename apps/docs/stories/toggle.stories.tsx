import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";

import { Toggle } from "@prism/react/toggle";

/**
 * Toggle Component
 *
 * A two-state button that can be toggled between "on" and "off" states.
 * Commonly used in toolbars for formatting controls or feature toggles.
 *
 * ## Key Features
 * - Built on Radix UI Toggle primitive for robust accessibility
 * - Supports keyboard navigation (Space/Enter to toggle)
 * - Two visual variants: default and outline
 * - Three size options: small, default, and large
 * - Fully accessible with proper ARIA attributes
 *
 * ## When to Use
 * - Text formatting toolbars (bold, italic, underline)
 * - Filter controls in data tables
 * - View mode toggles (grid/list view)
 *
 * ## Toggle vs Switch
 * - **Toggle**: Button-like control for temporary actions (formatting, filters)
 * - **Switch**: Physical switch appearance for settings that persist (enable notifications)
 */
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style variant",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size of the toggle",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the toggle",
    },
    pressed: {
      control: "boolean",
      description: "Controlled state (on/off)",
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle with text content
 */
export const Default: Story = {
  args: {
    children: "Toggle",
    "aria-label": "Toggle",
  },
};

/**
 * Toggle with icon - commonly used in formatting toolbars
 */
export const WithIcon: Story = {
  args: {
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

/**
 * Toggle with both icon and text
 */
export const WithIconAndText: Story = {
  args: {
    "aria-label": "Toggle bold",
    children: (
      <>
        <Bold className="h-4 w-4" />
        Bold
      </>
    ),
  },
};

/**
 * Outline variant provides a bordered appearance
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

/**
 * Small size toggle
 */
export const Small: Story = {
  args: {
    size: "sm",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

/**
 * Large size toggle
 */
export const Large: Story = {
  args: {
    size: "lg",
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

/**
 * Disabled toggle cannot be interacted with
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

/**
 * Pressed (active) state
 */
export const Pressed: Story = {
  args: {
    pressed: true,
    "aria-label": "Toggle italic",
    children: <Italic className="h-4 w-4" />,
  },
};

/**
 * Formatting toolbar example showing real-world usage
 */
export const FormattingToolbar: Story = {
  render: () => (
    <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-4">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

/**
 * All size variations side by side
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Small toggle" size="sm">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Default toggle" size="default">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Large toggle" size="lg">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

/**
 * All variants side by side
 */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Default variant" variant="default">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Outline variant" variant="outline">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

/**
 * Different states: unpressed, pressed, and disabled
 */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Toggle aria-label="Unpressed toggle">
          <Italic className="h-4 w-4" />
        </Toggle>
        <span className="text-xs text-gray-600">Unpressed</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle aria-label="Pressed toggle" pressed>
          <Italic className="h-4 w-4" />
        </Toggle>
        <span className="text-xs text-gray-600">Pressed</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle aria-label="Disabled toggle" disabled>
          <Italic className="h-4 w-4" />
        </Toggle>
        <span className="text-xs text-gray-600">Disabled</span>
      </div>
    </div>
  ),
};

/**
 * Outline variant in all sizes
 */
export const OutlineSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Small outline" size="sm" variant="outline">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Default outline" size="default" variant="outline">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Large outline" size="lg" variant="outline">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
};

/**
 * Text-only toggles (less common but supported)
 */
export const TextOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle aria-label="Toggle feature" variant="outline">
        Feature A
      </Toggle>
      <Toggle aria-label="Toggle setting" variant="outline">
        Feature B
      </Toggle>
      <Toggle aria-label="Toggle option" pressed variant="outline">
        Feature C
      </Toggle>
    </div>
  ),
};

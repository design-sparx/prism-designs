import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@prism/react/toggle-group";

/**
 * Toggle Group Component
 *
 * A set of two-state buttons that can be toggled on or off, with two modes:
 * - Single: Only one item can be active at a time (like radio buttons)
 * - Multiple: Multiple items can be active simultaneously (like checkboxes)
 *
 * ## Key Features
 * - Built on Radix UI ToggleGroup primitive for robust accessibility
 * - Two selection modes: single and multiple
 * - Supports keyboard navigation with arrow keys
 * - Two visual variants: default and outline
 * - Three size options: small, default, and large
 * - Context-based prop sharing (variant/size apply to all items)
 *
 * ## When to Use
 * - Text formatting toolbars (bold, italic, underline)
 * - Text alignment controls (left, center, right)
 * - View mode switchers (grid, list, compact)
 * - Filter controls where multiple options can be selected
 *
 * ## Toggle Group vs Individual Toggles
 * - **Toggle Group**: Related options that should be grouped visually and functionally
 * - **Individual Toggles**: Unrelated options that can be scattered across the UI
 */
const meta = {
  title: "Components/Toggle Group",
  component: ToggleGroup,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection mode",
      table: {
        defaultValue: { summary: "single" },
      },
    },
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
      description: "Size of the toggle items",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables all items in the group",
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Single selection mode - only one item can be active at a time.
 * Common for mutually exclusive options like text alignment.
 */
export const Single: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem aria-label="Align left" value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Multiple selection mode - multiple items can be active simultaneously.
 * Common for text formatting where you can apply multiple styles at once.
 */
export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle underline" value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Outline variant provides a bordered appearance
 */
export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem aria-label="Align left" value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Small size variant
 */
export const Small: Story = {
  render: () => (
    <ToggleGroup size="sm" type="single">
      <ToggleGroupItem aria-label="Align left" value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Large size variant
 */
export const Large: Story = {
  render: () => (
    <ToggleGroup size="lg" type="single">
      <ToggleGroupItem aria-label="Align left" value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Disabled state - all items are disabled and cannot be interacted with
 */
export const Disabled: Story = {
  render: () => (
    <ToggleGroup disabled type="single">
      <ToggleGroupItem aria-label="Align left" value="left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * With text labels instead of icons
 */
export const WithText: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem aria-label="Left align" value="left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Center align" value="center">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Right align" value="right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * With both icons and text
 */
export const WithIconAndText: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem aria-label="Bold" value="bold">
        <Bold className="mr-2 h-4 w-4" />
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Italic" value="italic">
        <Italic className="mr-2 h-4 w-4" />
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Underline" value="underline">
        <Underline className="mr-2 h-4 w-4" />
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * All size variations side by side
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-600">Small:</span>
        <ToggleGroup size="sm" type="single">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-600">Default:</span>
        <ToggleGroup size="default" type="single">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-600">Large:</span>
        <ToggleGroup size="lg" type="single">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * All variants side by side
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-600">Default:</span>
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-gray-600">Outline:</span>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Formatting toolbar example showing real-world usage
 * Combines alignment (single) and formatting (multiple) controls
 */
export const FormattingToolbar: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Alignment:</span>
        <ToggleGroup size="sm" type="single" variant="outline">
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Formatting:</span>
        <ToggleGroup size="sm" type="multiple" variant="outline">
          <ToggleGroupItem aria-label="Toggle bold" value="bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle italic" value="italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle underline" value="underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Controlled example - state is managed externally
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState("center");

    return (
      <div className="flex flex-col gap-4">
        <ToggleGroup onValueChange={setValue} type="single" value={value}>
          <ToggleGroupItem aria-label="Align left" value="left">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align center" value="center">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Align right" value="right">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-gray-600">
          Selected:{" "}
          <code className="rounded bg-gray-100 px-2 py-1">
            {value || "none"}
          </code>
        </p>
      </div>
    );
  },
};

/**
 * Controlled example with multiple selection
 */
export const ControlledMultiple: Story = {
  render: function ControlledMultipleExample() {
    const [values, setValues] = React.useState<string[]>(["bold"]);

    return (
      <div className="flex flex-col gap-4">
        <ToggleGroup onValueChange={setValues} type="multiple" value={values}>
          <ToggleGroupItem aria-label="Toggle bold" value="bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle italic" value="italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Toggle underline" value="underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-sm text-gray-600">
          Selected:{" "}
          <code className="rounded bg-gray-100 px-2 py-1">
            {values.length > 0 ? values.join(", ") : "none"}
          </code>
        </p>
      </div>
    );
  },
};

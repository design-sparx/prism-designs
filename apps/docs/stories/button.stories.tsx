import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";

/**
 * Button Component Stories
 *
 * Showcases all variants, sizes, and states of the Prism Button component.
 */

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
      description: "The size of the button",
    },
    asChild: {
      control: "boolean",
      description: "Render as child component (polymorphism)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default Primary Button
 */
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
  },
};

/**
 * Secondary Button
 */
export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

/**
 * Outline Button
 */
export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

/**
 * Ghost Button
 */
export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

/**
 * Destructive Button
 */
export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

/**
 * Small Size
 */
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

/**
 * Large Size
 */
export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

/**
 * Icon Button (Square)
 */
export const Icon: Story = {
  args: {
    children: "→",
    size: "icon",
  },
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

/**
 * As Link (Polymorphic)
 *
 * Demonstrates using asChild to render as a link
 */
export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://github.com/yourusername/prism" rel="noopener noreferrer" target="_blank">
        Visit GitHub
      </a>
    </Button>
  ),
};

/**
 * All Variants Showcase
 *
 * Shows all button variants side by side
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

/**
 * All Sizes Showcase
 *
 * Shows all button sizes side by side
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">→</Button>
    </div>
  ),
};

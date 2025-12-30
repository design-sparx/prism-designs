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
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
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
 * Default Button
 */
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
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
 * Link Variant
 *
 * Renders as a text link with underline on hover
 */
export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
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
 * Small Icon Button
 */
export const IconSmall: Story = {
  args: {
    children: "×",
    size: "icon-sm",
  },
};

/**
 * Large Icon Button
 */
export const IconLarge: Story = {
  args: {
    children: "☰",
    size: "icon-lg",
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
      <a
        href="https://github.com/yourusername/prism"
        rel="noopener noreferrer"
        target="_blank"
      >
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
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
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
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * All Icon Sizes Showcase
 *
 * Shows all icon button sizes side by side
 */
export const AllIconSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button size="icon-sm">×</Button>
      <Button size="icon">→</Button>
      <Button size="icon-lg">☰</Button>
    </div>
  ),
};

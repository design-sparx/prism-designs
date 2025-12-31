import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "@prism/react/badge";

/**
 * Badge Component Stories
 *
 * Showcases all variants of the Prism Badge component.
 * Badges are used to display small labels, status indicators, or counts.
 */

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style variant of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default Badge
 */
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

/**
 * Secondary Badge
 *
 * Used for less prominent information
 */
export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

/**
 * Destructive Badge
 *
 * Used for errors, warnings, or critical status
 */
export const Destructive: Story = {
  args: {
    children: "Error",
    variant: "destructive",
  },
};

/**
 * Outline Badge
 *
 * A lighter alternative with just a border
 */
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

/**
 * Badge with Count
 *
 * Common pattern for notification badges
 */
export const WithCount: Story = {
  args: {
    children: "99+",
  },
};

/**
 * Status Badges
 *
 * Example use case for different status indicators
 */
export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge>New</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="destructive">Deprecated</Badge>
      <Badge variant="outline">Coming Soon</Badge>
    </div>
  ),
};

/**
 * All Variants Showcase
 *
 * Shows all badge variants side by side
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

/**
 * In Context Example
 *
 * Shows badges used with other elements (like text)
 */
export const InContext: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Feature Name</span>
        <Badge variant="secondary">Beta</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Notifications</span>
        <Badge>12</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>Legacy API</span>
        <Badge variant="destructive">Deprecated</Badge>
      </div>
    </div>
  ),
};

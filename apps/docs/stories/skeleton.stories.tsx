import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "@prism/react/skeleton";

/**
 * Skeleton Component Stories
 *
 * Demonstrates loading placeholder patterns using the Skeleton component.
 */

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Default Skeleton
 */
export const Default: Story = {
  render: () => <Skeleton className="h-12 w-12" />,
};

/**
 * Circular Skeleton (Avatar)
 */
export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
};

/**
 * Card Skeleton
 */
export const Card: Story = {
  render: () => (
    <div style={{ width: "350px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Avatar with Text Skeleton
 */
export const AvatarWithText: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Skeleton className="h-12 w-12 rounded-full" />
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};

/**
 * Paragraph Skeleton
 */
export const Paragraph: Story = {
  render: () => (
    <div style={{ width: "500px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
};

/**
 * List Item Skeleton
 */
export const ListItem: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem" }}>
            <Skeleton className="h-10 w-10 rounded" />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Table Row Skeleton
 */
export const TableRow: Story = {
  render: () => (
    <div style={{ width: "600px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
          >
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/5" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Form Skeleton
 */
export const Form: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  ),
};

/**
 * Dashboard Skeleton
 */
export const Dashboard: Story = {
  render: () => (
    <div style={{ width: "800px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
              }}
            >
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>

        {/* Chart */}
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    </div>
  ),
};

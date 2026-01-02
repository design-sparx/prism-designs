import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "@prism/react/separator";

/**
 * Separator Component Stories
 *
 * Demonstrates the Separator component for visually or semantically dividing content.
 */

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is purely decorative (not semantic)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

/**
 * Default Separator (Horizontal)
 */
export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <div style={{ padding: "1rem 0" }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: "500" }}>
          Prism Design System
        </h4>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            marginTop: "0.25rem",
          }}
        >
          An educational design system
        </p>
      </div>
      <Separator {...args} />
      <div
        style={{
          display: "flex",
          height: "1.25rem",
          alignItems: "center",
          fontSize: "0.875rem",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        <div>Docs</div>
        <div>Blog</div>
        <div>GitHub</div>
      </div>
    </div>
  ),
};

/**
 * Vertical Separator
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        height: "1.25rem",
        alignItems: "center",
        fontSize: "0.875rem",
        gap: "1rem",
      }}
    >
      <div>Docs</div>
      <Separator {...args} />
      <div>Blog</div>
      <Separator {...args} />
      <div>GitHub</div>
    </div>
  ),
};

/**
 * Semantic Separator (not decorative)
 */
export const Semantic: Story = {
  args: {
    decorative: false,
  },
  render: (args) => (
    <div style={{ width: "300px" }}>
      <div style={{ padding: "1rem 0" }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: "500" }}>Section 1</h4>
        <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Content for section 1
        </p>
      </div>
      <Separator {...args} />
      <div style={{ padding: "1rem 0" }}>
        <h4 style={{ fontSize: "0.875rem", fontWeight: "500" }}>Section 2</h4>
        <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
          Content for section 2
        </p>
      </div>
    </div>
  ),
};

/**
 * Custom Spacing
 */
export const CustomSpacing: Story = {
  render: () => (
    <div style={{ width: "300px" }}>
      <div>Content above</div>
      <Separator className="my-8" />
      <div>Content below with larger spacing</div>
    </div>
  ),
};

/**
 * In Navigation
 */
export const InNavigation: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        fontSize: "0.875rem",
      }}
    >
      <a href="#home" style={{ textDecoration: "none" }}>
        Home
      </a>
      <Separator orientation="vertical" style={{ height: "1rem" }} />
      <a href="#about" style={{ textDecoration: "none" }}>
        About
      </a>
      <Separator orientation="vertical" style={{ height: "1rem" }} />
      <a href="#contact" style={{ textDecoration: "none" }}>
        Contact
      </a>
    </div>
  ),
};

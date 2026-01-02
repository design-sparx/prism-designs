import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "@prism/react/avatar";

/**
 * Avatar Component Stories
 *
 * Demonstrates the Avatar component for displaying user profile images with fallbacks.
 */

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the avatar",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default Avatar with Image
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Avatar with Fallback (broken image)
 */
export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage alt="John Doe" src="/broken-image.jpg" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Avatar Sizes
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar size="sm">
        <AvatarImage alt="Small" src="https://github.com/shadcn.png" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage alt="Medium" src="https://github.com/shadcn.png" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="Large" src="https://github.com/shadcn.png" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarImage alt="Extra Large" src="https://github.com/shadcn.png" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Small Avatar
 */
export const Small: Story = {
  render: () => (
    <Avatar size="sm">
      <AvatarImage alt="User" src="https://github.com/shadcn.png" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Medium Avatar
 */
export const Medium: Story = {
  render: () => (
    <Avatar size="md">
      <AvatarImage alt="User" src="https://github.com/shadcn.png" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Large Avatar
 */
export const Large: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage alt="User" src="https://github.com/shadcn.png" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Extra Large Avatar
 */
export const ExtraLarge: Story = {
  render: () => (
    <Avatar size="xl">
      <AvatarImage alt="User" src="https://github.com/shadcn.png" />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  ),
};

/**
 * Custom Fallback Colors
 */
export const CustomFallback: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar>
        <AvatarFallback className="bg-red-500 text-white">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-500 text-white">CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-purple-500 text-white">EF</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Avatar Group
 */
export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar style={{ marginLeft: "0" }}>
        <AvatarImage alt="User 1" src="https://github.com/shadcn.png" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar style={{ marginLeft: "-0.5rem" }}>
        <AvatarImage alt="User 2" src="https://github.com/vercel.png" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar style={{ marginLeft: "-0.5rem" }}>
        <AvatarImage alt="User 3" src="https://github.com/react.png" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar style={{ marginLeft: "-0.5rem" }}>
        <AvatarFallback className="bg-muted">+5</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * With Text
 */
export const WithText: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Avatar>
        <AvatarImage alt="John Doe" src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>John Doe</div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
          }}
        >
          john@example.com
        </div>
      </div>
    </div>
  ),
};

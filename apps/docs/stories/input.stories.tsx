import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { Input } from "@prism/react/input";
import { Label } from "@prism/react/label";

/**
 * Input Component Stories
 *
 * Showcases different input types, states, and usage patterns
 * following the shadcn/ui implementation.
 */

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "time",
        "file",
      ],
      description: "The type of input field",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Default Input
 */
export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

/**
 * Email Input
 *
 * Input configured for email addresses
 */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Email",
  },
};

/**
 * Password Input
 *
 * Input with obscured text for passwords
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
};

/**
 * Number Input
 *
 * Input for numeric values with spinner controls
 */
export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter a number",
  },
};

/**
 * Search Input
 *
 * Input optimized for search functionality
 */
export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

/**
 * Disabled State
 *
 * Input that cannot be interacted with
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

/**
 * With Default Value
 *
 * Input with a pre-filled value
 */
export const WithDefaultValue: Story = {
  args: {
    defaultValue: "Pre-filled value",
  },
};

/**
 * File Input
 *
 * Input for file uploads
 */
export const File: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      <Label htmlFor="file-input">Upload file</Label>
      <Input id="file-input" type="file" />
    </div>
  ),
};

/**
 * With Label
 *
 * Input paired with a label for accessibility
 */
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "20rem" }}>
      <Label htmlFor="email-input">Email</Label>
      <Input id="email-input" placeholder="m@example.com" type="email" />
    </div>
  ),
};

/**
 * With Button
 *
 * Input combined with a button (subscription pattern)
 */
export const WithButton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", maxWidth: "24rem" }}>
      <Input placeholder="Email" style={{ flex: 1 }} type="email" />
      <Button type="button">Subscribe</Button>
    </div>
  ),
};

/**
 * Form Example
 *
 * Input used in a complete form with labels and helper text
 */
export const FormExample: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-alert -- Storybook demo needs alert for user feedback
        alert("Form submitted!");
      }}
      style={{ display: "grid", gap: "1rem", maxWidth: "20rem" }}
    >
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="email-form">Email</Label>
        <Input
          id="email-form"
          placeholder="m@example.com"
          required
          type="email"
        />
        <p style={{ fontSize: "0.75rem", color: "#737373" }}>
          We&apos;ll never share your email.
        </p>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  ),
};

/**
 * Different Input Types
 *
 * Showcase of various HTML5 input types
 */
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: "20rem" }}>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="input-text">Text</Label>
        <Input id="input-text" placeholder="Text input" type="text" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="input-email">Email</Label>
        <Input id="input-email" placeholder="email@example.com" type="email" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="input-password">Password</Label>
        <Input id="input-password" placeholder="••••••••" type="password" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="input-number">Number</Label>
        <Input id="input-number" placeholder="123" type="number" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="input-date">Date</Label>
        <Input id="input-date" type="date" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <Label htmlFor="input-time">Time</Label>
        <Input id="input-time" type="time" />
      </div>
    </div>
  ),
};

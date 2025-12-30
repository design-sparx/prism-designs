import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@prism/react/input";

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
      <label
        htmlFor="file-input"
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        Upload file
      </label>
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
      <label
        htmlFor="email-input"
        style={{ fontSize: "0.875rem", fontWeight: 500 }}
      >
        Email
      </label>
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
      <button
        style={{
          padding: "0 1rem",
          backgroundColor: "#0ea5e9",
          color: "white",
          borderRadius: "0.375rem",
          border: "none",
          cursor: "pointer",
          fontWeight: 500,
        }}
        type="button"
      >
        Subscribe
      </button>
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
        <label htmlFor="name" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          Name
        </label>
        <Input id="name" placeholder="John Doe" required />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="email-form"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Email
        </label>
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

      <button
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#0ea5e9",
          color: "white",
          borderRadius: "0.375rem",
          border: "none",
          cursor: "pointer",
          fontWeight: 500,
        }}
        type="submit"
      >
        Submit
      </button>
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
        <label
          htmlFor="input-text"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Text
        </label>
        <Input id="input-text" placeholder="Text input" type="text" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="input-email"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Email
        </label>
        <Input id="input-email" placeholder="email@example.com" type="email" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="input-password"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Password
        </label>
        <Input id="input-password" placeholder="••••••••" type="password" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="input-number"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Number
        </label>
        <Input id="input-number" placeholder="123" type="number" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="input-date"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Date
        </label>
        <Input id="input-date" type="date" />
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label
          htmlFor="input-time"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Time
        </label>
        <Input id="input-time" type="time" />
      </div>
    </div>
  ),
};

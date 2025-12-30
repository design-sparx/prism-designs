import type { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "@prism/react/text-input";

/**
 * TextInput Component Stories
 *
 * Showcases all variants and states of the Prism TextInput component.
 */

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "ghost"],
      description: "The visual style variant of the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "The HTML input type",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

/**
 * Default Input
 */
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    variant: "default",
  },
};

/**
 * Filled Variant
 */
export const Filled: Story = {
  args: {
    placeholder: "Enter text...",
    variant: "filled",
  },
};

/**
 * Ghost Variant
 */
export const Ghost: Story = {
  args: {
    placeholder: "Enter text...",
    variant: "ghost",
  },
};

/**
 * With Value
 */
export const WithValue: Story = {
  args: {
    defaultValue: "Hello, World!",
    variant: "default",
  },
};

/**
 * Email Input
 */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email...",
    variant: "default",
  },
};

/**
 * Password Input
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    variant: "default",
  },
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  args: {
    placeholder: "Cannot edit...",
    disabled: true,
    variant: "default",
  },
};

/**
 * All Variants Showcase
 *
 * Shows all input variants stacked
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
      }}
    >
      <TextInput placeholder="Default variant" variant="default" />
      <TextInput placeholder="Filled variant" variant="filled" />
      <TextInput placeholder="Ghost variant" variant="ghost" />
    </div>
  ),
};

/**
 * Different Input Types
 *
 * Shows various HTML input types
 */
export const InputTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
      }}
    >
      <TextInput placeholder="Text input" type="text" />
      <TextInput placeholder="email@example.com" type="email" />
      <TextInput placeholder="Password" type="password" />
      <TextInput placeholder="123" type="number" />
      <TextInput placeholder="+1 (555) 000-0000" type="tel" />
      <TextInput placeholder="https://example.com" type="url" />
    </div>
  ),
};

/**
 * Form Example
 *
 * Demonstrates a realistic form layout
 */
export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "400px",
      }}
    >
      <div>
        <label
          htmlFor="name"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Full Name
        </label>
        <TextInput id="name" placeholder="John Doe" />
      </div>
      <div>
        <label
          htmlFor="email"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Email Address
        </label>
        <TextInput
          id="email"
          placeholder="john@example.com"
          type="email"
          variant="filled"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Password
        </label>
        <TextInput id="password" placeholder="••••••••" type="password" />
      </div>
    </div>
  ),
};

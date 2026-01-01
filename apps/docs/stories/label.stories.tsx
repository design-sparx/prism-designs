import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { Checkbox } from "@prism/react/checkbox";
import { Input } from "@prism/react/input";
import { Label } from "@prism/react/label";

/**
 * Label Component Stories
 *
 * Showcases the Prism Label component - an accessible form label
 * that associates text descriptions with form controls.
 *
 * Educational notes:
 * - Labels improve accessibility by describing form inputs
 * - Use htmlFor to connect the label to its input (makes label clickable)
 * - Screen readers announce the label when the input is focused
 * - Clicking a label focuses/activates its associated control
 */

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: {
      control: "text",
      description: "The id of the form control this label is associated with",
    },
    disabled: {
      control: "boolean",
      description: "Whether the label appears disabled (reduced opacity)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Default Label
 *
 * A simple label without any association.
 * Note: Labels should typically use htmlFor to connect to an input.
 */
export const Default: Story = {
  args: {
    children: "Email Address",
  },
};

/**
 * With Text Input
 *
 * Demonstrates the most common pattern: a label associated with a text input.
 * Click the label to focus the input field.
 */
export const WithTextInput: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" placeholder="you@example.com" type="email" />
    </div>
  ),
};

/**
 * With Checkbox
 *
 * Shows a label paired with a checkbox.
 * Click the label text to toggle the checkbox.
 */
export const WithCheckbox: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <input id="terms" type="checkbox" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

/**
 * With Radio Buttons
 *
 * Demonstrates labels with a radio button group.
 * Each label can be clicked to select its radio button.
 */
export const WithRadioButtons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div>Select your preferred contact method:</div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input id="contact-email" name="contact" type="radio" />
        <Label htmlFor="contact-email">Email</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input id="contact-phone" name="contact" type="radio" />
        <Label htmlFor="contact-phone">Phone</Label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input id="contact-sms" name="contact" type="radio" />
        <Label htmlFor="contact-sms">SMS</Label>
      </div>
    </div>
  ),
};

/**
 * Disabled State
 *
 * Shows a label styled to indicate the associated control is disabled.
 * Notice the reduced opacity and cursor change.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label disabled htmlFor="disabled-input">
        Disabled Field
      </Label>
      <Input
        disabled
        id="disabled-input"
        placeholder="Cannot edit"
        type="text"
      />
    </div>
  ),
};

/**
 * Required Field Pattern
 *
 * Common pattern showing a required field indicator with the label.
 */
export const RequiredField: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label htmlFor="required-field">
        Full Name <span style={{ color: "#ef4444" }}>*</span>
      </Label>
      <Input id="required-field" required type="text" />
    </div>
  ),
};

/**
 * With Helper Text
 *
 * Shows a label with additional helper text below the input.
 */
export const WithHelperText: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label htmlFor="password">Password</Label>
      <Input aria-describedby="password-hint" id="password" type="password" />
      <span
        id="password-hint"
        style={{ fontSize: "0.875rem", color: "#6b7280" }}
      >
        Must be at least 8 characters long
      </span>
    </div>
  ),
};

/**
 * Wrapped Input Pattern
 *
 * Alternative pattern where the label wraps the input.
 * No htmlFor needed - the association is implicit.
 */
export const WrappedInput: Story = {
  render: () => (
    <Label style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      Username
      <Input type="text" />
    </Label>
  ),
};

/**
 * Inline Checkbox Pattern
 *
 * Common pattern where label wraps a checkbox for inline alignment.
 */
export const InlineCheckbox: Story = {
  render: () => (
    <Label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <input type="checkbox" />
      Remember me
    </Label>
  ),
};

/**
 * Form Example
 *
 * Complete form showcasing multiple labels with different input types.
 */
export const FormExample: Story = {
  render: () => (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        width: "300px",
      }}
    >
      {/* Text input */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label htmlFor="form-name">
          Name <span style={{ color: "#ef4444" }}>*</span>
        </Label>
        <Input id="form-name" required type="text" />
      </div>

      {/* Email input */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Label htmlFor="form-email">
          Email <span style={{ color: "#ef4444" }}>*</span>
        </Label>
        <Input id="form-email" required type="email" />
      </div>

      {/* Checkbox */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Checkbox id="form-newsletter" />
        <Label htmlFor="form-newsletter">Subscribe to newsletter</Label>
      </div>

      {/* Submit button */}
      <Button type="submit">Submit</Button>
    </form>
  ),
};

/**
 * Custom Styling
 *
 * Demonstrates adding custom styles via className.
 */
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Label className="text-lg font-bold text-blue-600" htmlFor="custom">
        Custom Styled Label
      </Label>
      <Input id="custom" type="text" />
    </div>
  ),
};

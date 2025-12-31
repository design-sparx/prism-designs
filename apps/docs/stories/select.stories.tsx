import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@prism/react/select";

/**
 * Select Component Stories
 *
 * Showcases the simplified Select component built with Radix UI primitives.
 *
 * Educational Focus:
 * - Core Select functionality without advanced features (groups, separators)
 * - Perfect for learning compound components and Radix UI basics
 * - Demonstrates controlled/uncontrolled patterns, disabled states, and forms
 */

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * Default Select
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * With Default Value
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="banana">
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Disabled State
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * With Disabled Items
 */
export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem disabled value="banana">
          Banana (Out of stock)
        </SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem disabled value="grape">
          Grape (Out of stock)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Long List with Scrolling
 */
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="us">United States</SelectItem>
        <SelectItem value="uk">United Kingdom</SelectItem>
        <SelectItem value="ca">Canada</SelectItem>
        <SelectItem value="au">Australia</SelectItem>
        <SelectItem value="de">Germany</SelectItem>
        <SelectItem value="fr">France</SelectItem>
        <SelectItem value="it">Italy</SelectItem>
        <SelectItem value="es">Spain</SelectItem>
        <SelectItem value="jp">Japan</SelectItem>
        <SelectItem value="cn">China</SelectItem>
        <SelectItem value="br">Brazil</SelectItem>
        <SelectItem value="in">India</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Form Example
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
        <label
          htmlFor="fruit-select"
          style={{ fontSize: "0.875rem", fontWeight: 500 }}
        >
          Favorite Fruit
        </label>
        <Select>
          <SelectTrigger id="fruit-select">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
        <p style={{ fontSize: "0.75rem", color: "#737373" }}>
          Choose your favorite fruit from the list
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

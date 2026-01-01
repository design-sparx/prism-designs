/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Storybook demo code with typed state objects */
/* eslint-disable @typescript-eslint/no-unsafe-return -- Storybook demo code with callbacks */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- Checkbox checked prop accepts boolean | 'indeterminate' */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { Checkbox } from "@prism/react/checkbox";
import { Label } from "@prism/react/label";

/**
 * Checkbox Component Stories
 *
 * Showcases the Prism Checkbox component - an accessible checkbox control
 * for toggling between checked and unchecked states.
 *
 * Educational notes:
 * - Built on Radix UI primitives for accessibility
 * - Supports both controlled and uncontrolled modes
 * - Always pair with a Label for better accessibility
 * - Use controlled mode (with state) for form validation
 */

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Default Checkbox
 *
 * A basic checkbox in its default unchecked state.
 */
export const Default: Story = {
  args: {},
};

/**
 * With Label
 *
 * Demonstrates the recommended pattern: checkbox paired with a label.
 * Click either the checkbox or label to toggle.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

/**
 * Checked by Default
 *
 * Uses defaultChecked for uncontrolled mode with initial checked state.
 */
export const CheckedByDefault: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox defaultChecked id="newsletter" />
      <Label htmlFor="newsletter">Subscribe to newsletter</Label>
    </div>
  ),
};

/**
 * Disabled
 *
 * Shows a disabled checkbox that cannot be interacted with.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox disabled id="disabled-checkbox" />
      <Label disabled htmlFor="disabled-checkbox">
        Disabled option
      </Label>
    </div>
  ),
};

/**
 * Disabled and Checked
 *
 * A disabled checkbox in the checked state.
 */
export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox defaultChecked disabled id="disabled-checked" />
      <Label disabled htmlFor="disabled-checked">
        Disabled and checked
      </Label>
    </div>
  ),
};

/**
 * Controlled Mode
 *
 * Demonstrates controlled mode with React state.
 * The checkbox state is managed by the parent component.
 */
function ControlledCheckboxExample(): JSX.Element {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checked}
          id="controlled"
          onCheckedChange={setChecked}
        />
        <Label htmlFor="controlled">Controlled checkbox</Label>
      </div>
      <p className="text-sm text-neutral-600">
        Status: {checked ? "Checked ✓" : "Unchecked"}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledCheckboxExample />,
};

/**
 * With Description
 *
 * Checkbox with a label and helper text below.
 */
export const WithDescription: Story = {
  render: () => (
    <div className="flex items-start space-x-2">
      <Checkbox className="mt-1" id="marketing" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="marketing">Marketing emails</Label>
        <p className="text-sm text-neutral-500">
          Receive emails about new products, features, and more.
        </p>
      </div>
    </div>
  ),
};

/**
 * Multiple Checkboxes
 *
 * A group of checkboxes for selecting multiple options.
 */
export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <p className="text-sm font-medium">Select your preferences:</p>

      <div className="flex items-center space-x-2">
        <Checkbox id="option-1" />
        <Label htmlFor="option-1">Email notifications</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="option-2" />
        <Label htmlFor="option-2">SMS notifications</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="option-3" />
        <Label htmlFor="option-3">Push notifications</Label>
      </div>
    </div>
  ),
};

/**
 * Form Example
 *
 * Complete form demonstrating checkbox usage with validation.
 */
interface FormState {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

function CheckboxFormExample(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-console -- Demo purposes
    console.log("Form submitted:", formState);
  };

  return (
    <form className="w-80 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Sign Up</h3>

        <div className="flex items-start space-x-2">
          <Checkbox
            checked={formState.terms}
            className="mt-1"
            id="form-terms"
            onCheckedChange={(checked) =>
              setFormState((prev) => ({ ...prev, terms: checked as boolean }))
            }
            required
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="form-terms">
              Accept terms and conditions{" "}
              <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-neutral-500">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            checked={formState.privacy}
            className="mt-1"
            id="form-privacy"
            onCheckedChange={(checked) =>
              setFormState((prev) => ({
                ...prev,
                privacy: checked as boolean,
              }))
            }
            required
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="form-privacy">
              Privacy acknowledgment <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-neutral-500">
              I understand how my data will be used.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formState.marketing}
            id="form-marketing"
            onCheckedChange={(checked) =>
              setFormState((prev) => ({
                ...prev,
                marketing: checked as boolean,
              }))
            }
          />
          <Label htmlFor="form-marketing">
            Send me promotional emails (optional)
          </Label>
        </div>
      </div>

      <Button
        className="w-full"
        disabled={!formState.terms || !formState.privacy}
        type="submit"
      >
        Submit
      </Button>

      <p className="text-xs text-neutral-500">
        Form can only be submitted when required fields are checked.
      </p>
    </form>
  );
}

export const FormExample: Story = {
  render: () => <CheckboxFormExample />,
};

/**
 * Indeterminate State
 *
 * Shows the indeterminate state (partially checked).
 * Useful for "select all" checkboxes.
 */
interface CheckboxItem {
  id: number;
  label: string;
  checked: boolean;
}

function IndeterminateCheckboxExample(): JSX.Element {
  const [items, setItems] = useState<CheckboxItem[]>([
    { id: 1, label: "Item 1", checked: false },
    { id: 2, label: "Item 2", checked: true },
    { id: 3, label: "Item 3", checked: false },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked);
  const isIndeterminate = someChecked && !allChecked;

  const handleSelectAll = (checked: boolean | "indeterminate"): void => {
    setItems(items.map((item) => ({ ...item, checked: checked === true })));
  };

  const handleItemChange = (id: number, checked: boolean): void => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 border-b pb-3">
        <Checkbox
          checked={isIndeterminate ? "indeterminate" : allChecked}
          id="select-all"
          onCheckedChange={handleSelectAll}
        />
        <Label htmlFor="select-all">Select all items</Label>
      </div>

      <div className="ml-6 space-y-3">
        {items.map((item) => (
          <div className="flex items-center space-x-2" key={item.id}>
            <Checkbox
              checked={item.checked}
              id={`item-${item.id}`}
              onCheckedChange={(checked) => {
                handleItemChange(item.id, checked as boolean);
              }}
            />
            <Label htmlFor={`item-${item.id}`}>{item.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export const IndeterminateState: Story = {
  render: () => <IndeterminateCheckboxExample />,
};

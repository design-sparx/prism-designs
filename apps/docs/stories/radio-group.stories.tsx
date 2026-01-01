/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Storybook demo code with typed state objects */
/* eslint-disable @typescript-eslint/no-unsafe-return -- Storybook demo code with callbacks */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@prism/react/label";
import { RadioGroup, RadioGroupItem } from "@prism/react/radio-group";

/**
 * RadioGroup Component Stories
 *
 * Showcases the Prism RadioGroup component - an accessible radio button group
 * for selecting a single option from multiple choices.
 *
 * Educational notes:
 * - Built on Radix UI primitives for accessibility
 * - Supports both controlled and uncontrolled modes
 * - Always pair RadioGroupItem with a Label for better accessibility
 * - Only one option can be selected at a time (mutually exclusive)
 */

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/RadioGroup",
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * Default RadioGroup
 *
 * A basic radio group with three options.
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="r1" value="option1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="r2" value="option2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="r3" value="option3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Uncontrolled Mode
 *
 * Uses defaultValue for uncontrolled mode with initial selection.
 */
export const Uncontrolled: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="default" value="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="comfortable" value="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="compact" value="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Controlled Mode
 *
 * Demonstrates controlled mode with React state.
 * The selected value is managed by the parent component.
 */
function ControlledRadioGroupExample(): JSX.Element {
  const [value, setValue] = useState("option2");

  return (
    <div className="flex flex-col space-y-4">
      <RadioGroup onValueChange={setValue} value={value}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="controlled-r1" value="option1" />
          <Label htmlFor="controlled-r1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="controlled-r2" value="option2" />
          <Label htmlFor="controlled-r2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="controlled-r3" value="option3" />
          <Label htmlFor="controlled-r3">Option 3</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-neutral-600">
        Selected: <span className="font-medium">{value}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledRadioGroupExample />,
};

/**
 * Disabled Group
 *
 * Shows a disabled radio group where no options can be selected.
 */
export const DisabledGroup: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="disabled-r1" value="option1" />
        <Label disabled htmlFor="disabled-r1">
          Option 1 (disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="disabled-r2" value="option2" />
        <Label disabled htmlFor="disabled-r2">
          Option 2 (disabled)
        </Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Individual Disabled Item
 *
 * Shows how to disable individual radio items.
 */
export const DisabledItem: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="mixed-r1" value="option1" />
        <Label htmlFor="mixed-r1">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem disabled id="mixed-r2" value="option2" />
        <Label disabled htmlFor="mixed-r2">
          Disabled option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="mixed-r3" value="option3" />
        <Label htmlFor="mixed-r3">Another available option</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * With Descriptions
 *
 * Radio group with labels and helper text.
 */
export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="starter">
      <div className="flex items-start space-x-2">
        <RadioGroupItem className="mt-1" id="starter" value="starter" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="starter">Starter Plan</Label>
          <p className="text-sm text-neutral-500">
            Perfect for individuals and small teams
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem className="mt-1" id="pro" value="pro" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="pro">Pro Plan</Label>
          <p className="text-sm text-neutral-500">
            For growing teams with advanced needs
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem className="mt-1" id="enterprise" value="enterprise" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="enterprise">Enterprise Plan</Label>
          <p className="text-sm text-neutral-500">
            Custom solutions for large organizations
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

/**
 * Vertical Layout
 *
 * Radio group arranged vertically with spacing.
 */
export const VerticalLayout: Story = {
  render: () => (
    <RadioGroup className="space-y-3" defaultValue="email">
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="email" value="email" />
        <Label htmlFor="email">Email</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="phone" value="phone" />
        <Label htmlFor="phone">Phone</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="mail" value="mail" />
        <Label htmlFor="mail">Mail</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Horizontal Layout
 *
 * Radio group arranged horizontally using flex.
 */
export const HorizontalLayout: Story = {
  render: () => (
    <RadioGroup className="flex space-x-4" defaultValue="card">
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="card" value="card" />
        <Label htmlFor="card">Card</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="paypal" value="paypal" />
        <Label htmlFor="paypal">PayPal</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem id="bank" value="bank" />
        <Label htmlFor="bank">Bank Transfer</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Form Example
 *
 * Complete form demonstrating radio group usage.
 */
interface FormState {
  plan: string;
  billing: string;
}

function RadioFormExample(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({
    billing: "monthly",
    plan: "pro",
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-console -- Demo purposes
    console.log("Form submitted:", formState);
  };

  return (
    <form className="w-96 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose Your Plan</h3>

        <div>
          <Label className="mb-3 block text-sm font-medium">
            Select a plan <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            onValueChange={(value) =>
              setFormState((prev) => ({ ...prev, plan: value }))
            }
            required
            value={formState.plan}
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem
                className="mt-1"
                id="form-starter"
                value="starter"
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="form-starter">Starter - $9/month</Label>
                <p className="text-sm text-neutral-500">Up to 5 team members</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem className="mt-1" id="form-pro" value="pro" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="form-pro">Pro - $29/month</Label>
                <p className="text-sm text-neutral-500">
                  Up to 20 team members
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem
                className="mt-1"
                id="form-enterprise"
                value="enterprise"
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="form-enterprise">Enterprise - Custom</Label>
                <p className="text-sm text-neutral-500">
                  Unlimited team members
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-3 block text-sm font-medium">
            Billing cycle <span className="text-red-500">*</span>
          </Label>
          <RadioGroup
            onValueChange={(value) =>
              setFormState((prev) => ({ ...prev, billing: value }))
            }
            required
            value={formState.billing}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="monthly" value="monthly" />
              <Label htmlFor="monthly">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="yearly" value="yearly" />
              <Label htmlFor="yearly">Yearly (Save 20%)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <button
        className="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 text-white disabled:opacity-50"
        type="submit"
      >
        Continue to Payment
      </button>

      <div className="text-xs text-neutral-500">
        <p>Selected plan: {formState.plan}</p>
        <p>Billing: {formState.billing}</p>
      </div>
    </form>
  );
}

export const FormExample: Story = {
  render: () => <RadioFormExample />,
};

/**
 * Card Style Options
 *
 * Radio group with card-style selection boxes.
 */
function CardStyleExample(): JSX.Element {
  const [selected, setSelected] = useState("basic");

  return (
    <RadioGroup
      className="grid gap-4"
      onValueChange={setSelected}
      value={selected}
    >
      <div
        className={`relative rounded-lg border p-4 ${
          selected === "basic"
            ? "border-primary-500 bg-primary-50"
            : "border-neutral-200"
        }`}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem id="card-basic" value="basic" />
          <div className="flex-1">
            <Label className="font-semibold" htmlFor="card-basic">
              Basic
            </Label>
            <p className="mt-1 text-sm text-neutral-600">
              Essential features for getting started
            </p>
            <p className="mt-2 text-lg font-bold">$0/month</p>
          </div>
        </div>
      </div>

      <div
        className={`relative rounded-lg border p-4 ${
          selected === "professional"
            ? "border-primary-500 bg-primary-50"
            : "border-neutral-200"
        }`}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem id="card-professional" value="professional" />
          <div className="flex-1">
            <Label className="font-semibold" htmlFor="card-professional">
              Professional
            </Label>
            <p className="mt-1 text-sm text-neutral-600">
              Advanced features for professionals
            </p>
            <p className="mt-2 text-lg font-bold">$19/month</p>
          </div>
        </div>
      </div>

      <div
        className={`relative rounded-lg border p-4 ${
          selected === "business"
            ? "border-primary-500 bg-primary-50"
            : "border-neutral-200"
        }`}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem id="card-business" value="business" />
          <div className="flex-1">
            <Label className="font-semibold" htmlFor="card-business">
              Business
            </Label>
            <p className="mt-1 text-sm text-neutral-600">
              Complete solution for teams
            </p>
            <p className="mt-2 text-lg font-bold">$49/month</p>
          </div>
        </div>
      </div>
    </RadioGroup>
  );
}

export const CardStyle: Story = {
  render: () => <CardStyleExample />,
};

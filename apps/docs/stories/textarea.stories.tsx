/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Storybook demo code with typed state objects */
/* eslint-disable @typescript-eslint/no-unsafe-return -- Storybook demo code with callbacks */
/* eslint-disable react/jsx-no-leaked-render -- Conditional rendering in demo code */
/* eslint-disable react/no-unescaped-entities -- Text content in demo code */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@prism/react/label";
import { Textarea } from "@prism/react/textarea";

/**
 * Textarea Component Stories
 *
 * Showcases the Prism Textarea component - a styled multi-line text input.
 *
 * Educational notes:
 * - Simple wrapper around native HTML textarea element
 * - No complex dependencies - just styling and ref forwarding
 * - Supports all standard textarea attributes (rows, cols, maxLength, etc.)
 * - Works with Label component for better accessibility
 */

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Textarea",
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * Default Textarea
 *
 * A basic textarea with placeholder text.
 */
export const Default: Story = {
  render: () => <Textarea placeholder="Type your message here..." />,
};

/**
 * With Label
 *
 * Textarea paired with a Label for better accessibility.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

/**
 * With Helper Text
 *
 * Textarea with a label and helper text below.
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your message</Label>
      <Textarea id="message-2" placeholder="Type your message here..." />
      <p className="text-sm text-neutral-500">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
};

/**
 * Disabled
 *
 * A disabled textarea that cannot be edited.
 */
export const Disabled: Story = {
  render: () => (
    <Textarea disabled placeholder="This textarea is disabled..." />
  ),
};

/**
 * With Default Value
 *
 * Textarea with pre-filled content (uncontrolled mode).
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Textarea
      defaultValue="This is some default text that can be edited."
      placeholder="Type your message here..."
    />
  ),
};

/**
 * Controlled Mode
 *
 * Demonstrates controlled mode with React state.
 * The textarea value is managed by the parent component.
 */
function ControlledTextareaExample(): JSX.Element {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="controlled-message">Your message</Label>
      <Textarea
        id="controlled-message"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here..."
        value={value}
      />
      <p className="text-sm text-neutral-500">
        Character count: <span className="font-medium">{value.length}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledTextareaExample />,
};

/**
 * With Character Limit
 *
 * Textarea with a maximum character limit enforced by maxLength.
 */
function CharacterLimitExample(): JSX.Element {
  const [value, setValue] = useState("");
  const maxLength = 100;

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="limited-message">Your message</Label>
      <Textarea
        id="limited-message"
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message here..."
        value={value}
      />
      <p className="text-sm text-neutral-500">
        {value.length}/{maxLength} characters
      </p>
    </div>
  );
}

export const WithCharacterLimit: Story = {
  render: () => <CharacterLimitExample />,
};

/**
 * Custom Rows
 *
 * Textarea with custom number of visible rows.
 */
export const CustomRows: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="custom-rows">Your message</Label>
      <Textarea
        id="custom-rows"
        placeholder="This textarea has 10 rows..."
        rows={10}
      />
    </div>
  ),
};

/**
 * Read Only
 *
 * A read-only textarea that displays content but cannot be edited.
 */
export const ReadOnly: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="readonly-message">Terms and Conditions</Label>
      <Textarea
        defaultValue="This is read-only content. You can select and copy this text, but you cannot edit it."
        id="readonly-message"
        readOnly
        rows={5}
      />
    </div>
  ),
};

/**
 * Form Example
 *
 * Complete form demonstrating textarea usage with validation.
 */
interface FeedbackForm {
  name: string;
  message: string;
}

function FeedbackFormExample(): JSX.Element {
  const [formState, setFormState] = useState<FeedbackForm>({
    message: "",
    name: "",
  });
  const [errors, setErrors] = useState<Partial<FeedbackForm>>({});

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const newErrors: Partial<FeedbackForm> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // eslint-disable-next-line no-console -- Demo purposes
    console.log("Form submitted:", formState);
    setFormState({ message: "", name: "" });
    setErrors({});
  };

  return (
    <form className="w-96 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Send us your feedback</h3>
        <p className="text-sm text-neutral-500">
          We'd love to hear from you! Share your thoughts below.
        </p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="feedback-name">
          Name <span className="text-red-500">*</span>
        </Label>
        <input
          className="focus-visible:border-primary-500 focus-visible:ring-primary-500/20 flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          id="feedback-name"
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Your name"
          value={formState.name}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="feedback-message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          id="feedback-message"
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Tell us what you think..."
          rows={5}
          value={formState.message}
        />
        {errors.message && (
          <p className="text-sm text-red-500" id="message-error">
            {errors.message}
          </p>
        )}
        <p className="text-xs text-neutral-500">
          Minimum 10 characters ({formState.message.length}/10)
        </p>
      </div>

      <button
        className="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 text-white disabled:opacity-50"
        type="submit"
      >
        Submit Feedback
      </button>
    </form>
  );
}

export const FormExample: Story = {
  render: () => <FeedbackFormExample />,
};

/**
 * With Error State
 *
 * Textarea with error styling and message.
 */
export const WithError: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="error-message">Your message</Label>
      <Textarea
        aria-describedby="error-description"
        aria-invalid="true"
        className="border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
        id="error-message"
        placeholder="Type your message here..."
      />
      <p className="text-sm text-red-500" id="error-description">
        This field is required
      </p>
    </div>
  ),
};

/**
 * With Success State
 *
 * Textarea with success styling and message.
 */
export const WithSuccess: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="success-message">Your message</Label>
      <Textarea
        className="border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20"
        defaultValue="Your message has been saved successfully!"
        id="success-message"
      />
      <p className="text-sm text-green-600">Message saved successfully</p>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@prism/react/tooltip";
import { Button } from "@prism/react/button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-help underline decoration-dotted">
          Hover over this text
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Additional information about the text</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click for more information</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover for details</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>
          This tooltip contains a longer piece of text that provides detailed
          information about the element. It can span multiple lines.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="default">Save</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save your changes</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Discard changes</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Permanently delete this item</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Save</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div>
          <p className="font-semibold">Save Document</p>
          <p className="mt-1 text-xs opacity-75">⌘S</p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnDisabledButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* Wrap disabled button in span for tooltip to work */}
        <span className="inline-block">
          <Button disabled>Disabled Action</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const CustomPosition: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const InstantTooltip: Story = {
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Instant Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Appears instantly (no delay)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const DelayedTooltip: Story = {
  render: () => (
    <TooltipProvider delayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Delayed Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Appears after 1 second delay</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Custom Styled</Button>
      </TooltipTrigger>
      <TooltipContent className="border-blue-700 bg-blue-600">
        <p>Custom blue tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const InFormContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex h-4 w-4 items-center justify-center rounded-full border text-xs"
            >
              ?
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">
              Choose a unique username between 3-20 characters. Only letters,
              numbers, and underscores are allowed.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <input
        type="text"
        id="username"
        className="w-full rounded-md border px-3 py-2"
        placeholder="Enter username"
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { Input } from "@prism/react/input";
import { Label } from "@prism/react/label";
import { Popover, PopoverContent, PopoverTrigger } from "@prism/react/popover";

/**
 * Popover Component Stories
 *
 * Showcases the Prism Popover component - a portal-based overlay for rich interactive content.
 *
 * Educational notes:
 * - Built on Radix UI primitives for accessibility and keyboard navigation
 * - Portal rendering prevents z-index issues
 * - Use asChild to merge props with custom trigger elements
 * - Popovers are for rich content; use Tooltips for simple text hints
 */

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Default Popover
 *
 * Basic popover with a button trigger and simple content.
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Popover Heading</h4>
          <p className="text-muted-foreground text-sm">
            This is a simple popover with some content inside.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * With Form Fields
 *
 * Popover containing form inputs for dimensions.
 */
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Set Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="text-sm leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="100%"
                id="width"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="300px"
                id="maxWidth"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="25px"
                id="height"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                className="col-span-2 h-8"
                defaultValue="none"
                id="maxHeight"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Different Alignments
 *
 * Popovers can be aligned to start, center, or end relative to the trigger.
 */
export const Alignments: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64">
          <p className="text-sm">Aligned to start</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-64">
          <p className="text-sm">Aligned to center (default)</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Align End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64">
          <p className="text-sm">Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * Custom Width
 *
 * Override the default width with custom className.
 */
export const CustomWidth: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Small (w-48)</Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <p className="text-sm">This popover has a smaller width.</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Large (w-96)</Button>
        </PopoverTrigger>
        <PopoverContent className="w-96">
          <p className="text-sm">
            This popover has a larger width to accommodate more content. You can
            customize the width using Tailwind classes.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * With Side Offset
 *
 * Adjust the distance between trigger and content.
 */
export const WithSideOffset: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Small Offset (4px)</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={4}>
          <p className="text-sm">Default offset of 4px</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Large Offset (16px)</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={16}>
          <p className="text-sm">Larger offset of 16px</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

/**
 * User Profile Example
 *
 * Real-world example: user profile card in a popover.
 */
export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex gap-4">
          <div className="bg-primary-100 text-primary-600 flex h-12 w-12 items-center justify-center rounded-full">
            JD
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">John Doe</h4>
            <p className="text-muted-foreground text-xs">
              john.doe@example.com
            </p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline">
                Message
              </Button>
              <Button size="sm">Follow</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Action Menu Example
 *
 * Real-world example: popover with action buttons.
 */
export const ActionMenu: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Actions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="grid gap-2">
          <Button className="justify-start" variant="ghost">
            Edit
          </Button>
          <Button className="justify-start" variant="ghost">
            Duplicate
          </Button>
          <Button className="justify-start" variant="ghost">
            Archive
          </Button>
          <div className="border-border my-1 border-t" />
          <Button className="text-destructive justify-start" variant="ghost">
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Custom Trigger Element
 *
 * Using asChild to make any element the trigger.
 */
export const CustomTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-neutral-100 px-3 py-2 text-sm hover:bg-neutral-200"
          role="button"
          tabIndex={0}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx={12} cy={12} r={10} />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Help
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Need help?</h4>
          <p className="text-muted-foreground text-sm">
            Click the help icon to access documentation, tutorials, and support
            resources.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

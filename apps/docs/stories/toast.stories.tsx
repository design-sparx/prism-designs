import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { toast, ToastAction, Toaster } from "@prism/react/toast";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast({
          title: "Notification",
          description: "This is a simple notification message",
        })
      }
    >
      Show Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast({
          variant: "success",
          title: "Success",
          description: "Your changes have been saved successfully",
        })
      }
    >
      Show Success Toast
    </Button>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        })
      }
    >
      Show Error Toast
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast({
          title: "File deleted",
          description: "Your file has been moved to trash",
          action: (
            <ToastAction
              altText="Undo deletion"
              onClick={() => {
                // Handle undo action
              }}
            >
              Undo
            </ToastAction>
          ),
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast({
          title: "Message sent",
        })
      }
    >
      Show Title Only
    </Button>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast({
          title: "Update Available",
          description:
            "A new version of the application is available. Update now to get the latest features and bug fixes.",
        })
      }
    >
      Show Long Content
    </Button>
  ),
};

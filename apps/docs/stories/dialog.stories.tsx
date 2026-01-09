import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@prism/react/dialog";
import { Input } from "@prism/react/input";
import { Label } from "@prism/react/label";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Helper component for controlled state
function DialogDemo(
  props: Partial<React.ComponentProps<typeof Dialog>>,
): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog onOpenChange={setOpen} open={open} {...props}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>
              This is a dialog description. It provides additional context about
              the dialog&apos;s purpose.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              Dialog content goes here. You can put any content inside the
              dialog body.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const WithoutOverlayClose: Story = {
  render: () => <DialogDemo closeOnOverlayClick={false} />,
};

export const WithoutEscClose: Story = {
  render: () => <DialogDemo closeOnEsc={false} />,
};

function WithoutCloseButtonComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)} showClose={false}>
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog doesn&apos;t have a close button. You must use the
              action buttons.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const WithoutCloseButton: Story = {
  render: () => <WithoutCloseButtonComponent />,
};

function SmallSizeComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Small Dialog</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)} size="sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>This is a small dialog.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const SmallSize: Story = {
  render: () => <SmallSizeComponent />,
};

function LargeSizeComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Large Dialog</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)} size="lg">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              This is a large dialog with more space.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4 text-sm text-gray-600">
              Large dialogs are useful when you need to display more content or
              complex forms.
            </p>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const LargeSize: Story = {
  render: () => <LargeSizeComponent />,
};

function FullSizeComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Full Dialog</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)} size="full">
          <DialogHeader>
            <DialogTitle>Full Size Dialog</DialogTitle>
            <DialogDescription>
              This dialog takes up most of the viewport.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-auto py-4">
            <p className="mb-4 text-sm text-gray-600">
              Full size dialogs are useful for complex workflows or detailed
              content.
            </p>
            {Array.from({ length: 10 }).map((_, i) => (
              <p className="mb-2 text-sm text-gray-600" key={i}>
                Content section {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const FullSize: Story = {
  render: () => <FullSizeComponent />,
};

function WithFormComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit Profile</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input defaultValue="John Doe" id="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input defaultValue="john@example.com" id="email" type="email" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const WithForm: Story = {
  render: () => <WithFormComponent />,
};

function ConfirmationDialogComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="destructive">
        Delete Account
      </Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)} size="sm">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} variant="destructive">
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const ConfirmationDialog: Story = {
  render: () => <ConfirmationDialogComponent />,
};

function ScrollableContentComponent(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Scrollable Dialog</Button>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              Please read and accept the terms and conditions.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <p className="mb-4 text-sm text-gray-600" key={i}>
                {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
              </p>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Decline
            </Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const ScrollableContent: Story = {
  render: () => <ScrollableContentComponent />,
};

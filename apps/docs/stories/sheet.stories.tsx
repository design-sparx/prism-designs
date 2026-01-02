import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@prism/react/sheet";
import { Button } from "@prism/react/button";

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Sheet</Button>
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetContent onClose={() => setOpen(false)}>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>
                This is a sheet component that slides in from the side of the
                screen.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                Add your content here. Sheets are great for filters, settings,
                or additional information that doesn't need to interrupt the
                main flow.
              </p>
            </div>
            <SheetFooter>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const FromLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open From Left</Button>
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetContent onClose={() => setOpen(false)} side="left">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>
                This sheet slides in from the left side.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-4">
              <a className="block text-sm hover:underline" href="#">
                Home
              </a>
              <a className="block text-sm hover:underline" href="#">
                About
              </a>
              <a className="block text-sm hover:underline" href="#">
                Services
              </a>
              <a className="block text-sm hover:underline" href="#">
                Contact
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const FromTop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open From Top</Button>
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetContent onClose={() => setOpen(false)} side="top">
            <SheetHeader>
              <SheetTitle>Notification</SheetTitle>
              <SheetDescription>
                This sheet slides in from the top.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600">
                You have 3 new messages and 2 pending tasks.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

export const FromBottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open From Bottom</Button>
        <Sheet onOpenChange={setOpen} open={open}>
          <SheetContent onClose={() => setOpen(false)} side="bottom">
            <SheetHeader>
              <SheetTitle>Share</SheetTitle>
              <SheetDescription>
                This sheet slides in from the bottom.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-2 py-4">
              <Button className="w-full" variant="outline">
                Share via Email
              </Button>
              <Button className="w-full" variant="outline">
                Copy Link
              </Button>
              <Button className="w-full" variant="outline">
                Download
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  },
};

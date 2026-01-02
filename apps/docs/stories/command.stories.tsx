import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@prism/react/command";
import { Calendar, Smile, Calculator, User, Settings } from "lucide-react";

const meta = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-[450px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-[450px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            onValueChange={setValue}
            placeholder="Search fruits..."
            value={value}
          />
          <CommandList>
            <CommandEmpty>No fruits found.</CommandEmpty>
            <CommandGroup heading="Fruits">
              <CommandItem>Apple</CommandItem>
              <CommandItem>Banana</CommandItem>
              <CommandItem>Cherry</CommandItem>
              <CommandItem>Date</CommandItem>
              <CommandItem>Elderberry</CommandItem>
              <CommandItem>Fig</CommandItem>
              <CommandItem>Grape</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState("");

    return (
      <div className="w-[450px] space-y-4">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Select an action..." />
          <CommandList>
            <CommandEmpty>No actions found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={(value) => setSelectedItem(value)}>
                Create New Document
              </CommandItem>
              <CommandItem onSelect={(value) => setSelectedItem(value)}>
                Open File
              </CommandItem>
              <CommandItem onSelect={(value) => setSelectedItem(value)}>
                Save As
              </CommandItem>
              <CommandItem onSelect={(value) => setSelectedItem(value)}>
                Export PDF
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        {selectedItem && (
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-600">
              Selected: <span className="font-semibold">{selectedItem}</span>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const MultipleGroups: Story = {
  render: () => {
    return (
      <div className="w-[450px]">
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="File">
              <CommandItem>New File</CommandItem>
              <CommandItem>Open File</CommandItem>
              <CommandItem>Save</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Edit">
              <CommandItem>Cut</CommandItem>
              <CommandItem>Copy</CommandItem>
              <CommandItem>Paste</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              <CommandItem>Zoom In</CommandItem>
              <CommandItem>Zoom Out</CommandItem>
              <CommandItem>Full Screen</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
  },
};

import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

describe("Command", () => {
  describe("Command (root)", () => {
    it("renders with combobox role", () => {
      render(
        <Command data-testid="command">
          <CommandInput />
        </Command>,
      );
      const command = screen.getByTestId("command");
      expect(command).toHaveAttribute("role", "combobox");
    });

    it("manages internal search state", async () => {
      const user = userEvent.setup();

      render(
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
          </CommandList>
        </Command>,
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "Item 1");

      expect(input).toHaveValue("Item 1");
    });

    it("supports controlled search value", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <Command onValueChange={onValueChange} value="">
          <CommandInput placeholder="Search..." />
        </Command>,
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "a");

      expect(onValueChange).toHaveBeenCalledWith("a");

      // Simulate parent updating the value
      rerender(
        <Command onValueChange={onValueChange} value="a">
          <CommandInput placeholder="Search..." />
        </Command>,
      );

      expect(input).toHaveValue("a");
    });
  });

  describe("CommandInput", () => {
    it("renders an input element", () => {
      render(
        <Command>
          <CommandInput data-testid="input" placeholder="Search..." />
        </Command>,
      );
      const input = screen.getByTestId("input");
      expect(input.tagName).toBe("INPUT");
    });

    it("accepts placeholder", () => {
      render(
        <Command>
          <CommandInput placeholder="Type to search..." />
        </Command>,
      );
      expect(
        screen.getByPlaceholderText("Type to search..."),
      ).toBeInTheDocument();
    });

    it("renders search icon", () => {
      render(
        <Command>
          <CommandInput />
        </Command>,
      );
      // Check for the search icon - the Search component renders an svg
      const searchIcon = document.querySelector("svg");
      expect(searchIcon).toBeInTheDocument();
    });
  });

  describe("CommandList", () => {
    it("renders with listbox role", () => {
      render(
        <Command>
          <CommandList data-testid="list" />
        </Command>,
      );
      const list = screen.getByTestId("list");
      expect(list).toHaveAttribute("role", "listbox");
    });

    it("renders children", () => {
      render(
        <Command>
          <CommandList>
            <div>List content</div>
          </CommandList>
        </Command>,
      );
      expect(screen.getByText("List content")).toBeInTheDocument();
    });
  });

  describe("CommandEmpty", () => {
    it("renders empty state message", () => {
      render(
        <Command>
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
          </CommandList>
        </Command>,
      );
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  describe("CommandGroup", () => {
    it("renders with group role", () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup data-testid="group">
              <CommandItem>Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );
      const group = screen.getByTestId("group");
      expect(group).toHaveAttribute("role", "group");
    });

    it("renders heading when provided", () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );
      expect(screen.getByText("Suggestions")).toBeInTheDocument();
    });

    it("does not render heading when not provided", () => {
      render(
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem>Item</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );
      const heading = document.querySelector("[cmdk-group-heading]");
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe("CommandItem", () => {
    it("renders with option role", () => {
      render(
        <Command>
          <CommandList>
            <CommandItem data-testid="item">Item 1</CommandItem>
          </CommandList>
        </Command>,
      );
      const item = screen.getByTestId("item");
      expect(item).toHaveAttribute("role", "option");
    });

    it("calls onSelect when clicked", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Command>
          <CommandList>
            <CommandItem onSelect={onSelect}>Item 1</CommandItem>
          </CommandList>
        </Command>,
      );

      await user.click(screen.getByText("Item 1"));
      expect(onSelect).toHaveBeenCalledWith("Item 1");
    });

    it("calls onSelect when Enter is pressed", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Command>
          <CommandList>
            <CommandItem onSelect={onSelect}>Item 1</CommandItem>
          </CommandList>
        </Command>,
      );

      const item = screen.getByText("Item 1");
      item.focus();
      await user.keyboard("{Enter}");

      expect(onSelect).toHaveBeenCalledWith("Item 1");
    });

    it("filters items based on search", async () => {
      const user = userEvent.setup();

      render(
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
            <CommandItem>Orange</CommandItem>
          </CommandList>
        </Command>,
      );

      expect(screen.getByText("Apple")).toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.getByText("Orange")).toBeInTheDocument();

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "ban");

      expect(screen.queryByText("Apple")).not.toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
      expect(screen.queryByText("Orange")).not.toBeInTheDocument();
    });

    it("uses value prop for filtering when provided", async () => {
      const user = userEvent.setup();

      render(
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandItem value="fruit-apple">🍎 Apple</CommandItem>
            <CommandItem value="fruit-banana">🍌 Banana</CommandItem>
          </CommandList>
        </Command>,
      );

      const input = screen.getByPlaceholderText("Search...");
      await user.type(input, "banana");

      expect(screen.queryByText("🍎 Apple")).not.toBeInTheDocument();
      expect(screen.getByText("🍌 Banana")).toBeInTheDocument();
    });

    it("does not trigger onSelect when disabled", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Command>
          <CommandList>
            <CommandItem disabled onSelect={onSelect}>
              Disabled Item
            </CommandItem>
          </CommandList>
        </Command>,
      );

      await user.click(screen.getByText("Disabled Item"));
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("CommandSeparator", () => {
    it("renders with separator role", () => {
      render(
        <Command>
          <CommandList>
            <CommandSeparator data-testid="separator" />
          </CommandList>
        </Command>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("role", "separator");
    });

    it("is hidden from screen readers", () => {
      render(
        <Command>
          <CommandList>
            <CommandSeparator data-testid="separator" />
          </CommandList>
        </Command>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("CommandShortcut", () => {
    it("renders shortcut text", () => {
      render(
        <Command>
          <CommandList>
            <CommandItem>
              Open
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandList>
        </Command>,
      );
      expect(screen.getByText("⌘K")).toBeInTheDocument();
    });
  });

  describe("Complete command", () => {
    it("renders full command palette", async () => {
      const onSelect = vi.fn();
      const user = userEvent.setup();

      render(
        <Command>
          <CommandInput placeholder="Type a command..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={onSelect}>
                Calendar
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={onSelect}>Search Emoji</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={onSelect}>Profile</CommandItem>
              <CommandItem onSelect={onSelect}>Billing</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );

      expect(
        screen.getByPlaceholderText("Type a command..."),
      ).toBeInTheDocument();
      expect(screen.getByText("Suggestions")).toBeInTheDocument();
      expect(screen.getByText("Calendar")).toBeInTheDocument();
      expect(screen.getByText("⌘K")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();

      // Test filtering
      const input = screen.getByPlaceholderText("Type a command...");
      await user.type(input, "prof");

      expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });
});

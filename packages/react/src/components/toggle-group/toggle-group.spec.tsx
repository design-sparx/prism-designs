import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="Option 1" value="1">
            Option 1
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Option 2" value="2">
            Option 2
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(
        <ToggleGroup className="custom-group" type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const group = screen.getByRole("group");
      expect(group).toHaveClass("custom-group");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <ToggleGroup ref={ref} type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Single Type Mode", () => {
    it("allows only one item to be selected", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const firstButton = screen.getByLabelText("First");
      const secondButton = screen.getByLabelText("Second");

      // Click first button
      await user.click(firstButton);
      expect(firstButton).toHaveAttribute("data-state", "on");
      expect(secondButton).toHaveAttribute("data-state", "off");

      // Click second button - should deselect first
      await user.click(secondButton);
      expect(firstButton).toHaveAttribute("data-state", "off");
      expect(secondButton).toHaveAttribute("data-state", "on");
    });

    it("calls onValueChange with single value", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ToggleGroup onValueChange={handleChange} type="single">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      await user.click(screen.getByLabelText("First"));
      expect(handleChange).toHaveBeenCalledWith("first");

      await user.click(screen.getByLabelText("Second"));
      expect(handleChange).toHaveBeenCalledWith("second");
    });

    it("can be controlled with value prop", () => {
      render(
        <ToggleGroup type="single" value="second">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(screen.getByLabelText("First")).toHaveAttribute(
        "data-state",
        "off",
      );
      expect(screen.getByLabelText("Second")).toHaveAttribute(
        "data-state",
        "on",
      );
    });
  });

  describe("Multiple Type Mode", () => {
    it("allows multiple items to be selected", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Third" value="third">
            Third
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const firstButton = screen.getByLabelText("First");
      const secondButton = screen.getByLabelText("Second");
      const thirdButton = screen.getByLabelText("Third");

      // All should start unselected
      expect(firstButton).toHaveAttribute("data-state", "off");
      expect(secondButton).toHaveAttribute("data-state", "off");
      expect(thirdButton).toHaveAttribute("data-state", "off");

      // Select first
      await user.click(firstButton);
      expect(firstButton).toHaveAttribute("data-state", "on");

      // Select second - first should remain selected
      await user.click(secondButton);
      expect(firstButton).toHaveAttribute("data-state", "on");
      expect(secondButton).toHaveAttribute("data-state", "on");

      // Select third - both first and second should remain selected
      await user.click(thirdButton);
      expect(firstButton).toHaveAttribute("data-state", "on");
      expect(secondButton).toHaveAttribute("data-state", "on");
      expect(thirdButton).toHaveAttribute("data-state", "on");
    });

    it("can deselect items in multiple mode", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const firstButton = screen.getByLabelText("First");

      // Select
      await user.click(firstButton);
      expect(firstButton).toHaveAttribute("data-state", "on");

      // Deselect
      await user.click(firstButton);
      expect(firstButton).toHaveAttribute("data-state", "off");
    });

    it("calls onValueChange with array of values", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ToggleGroup onValueChange={handleChange} type="multiple">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      await user.click(screen.getByLabelText("First"));
      expect(handleChange).toHaveBeenCalledWith(["first"]);

      await user.click(screen.getByLabelText("Second"));
      expect(handleChange).toHaveBeenCalledWith(["first", "second"]);
    });

    it("can be controlled with value prop as array", () => {
      render(
        <ToggleGroup type="multiple" value={["first", "third"]}>
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Third" value="third">
            Third
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(screen.getByLabelText("First")).toHaveAttribute(
        "data-state",
        "on",
      );
      expect(screen.getByLabelText("Second")).toHaveAttribute(
        "data-state",
        "off",
      );
      expect(screen.getByLabelText("Third")).toHaveAttribute(
        "data-state",
        "on",
      );
    });
  });

  describe("Variants", () => {
    it("applies default variant to all items via context", () => {
      render(
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Item");
      expect(item).toHaveClass("bg-transparent");
    });

    it("applies outline variant to all items via context", () => {
      render(
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem aria-label="Item 1" value="1">
            Item 1
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Item 2" value="2">
            Item 2
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item1 = screen.getByLabelText("Item 1");
      const item2 = screen.getByLabelText("Item 2");

      expect(item1).toHaveClass("border", "border-gray-200");
      expect(item2).toHaveClass("border", "border-gray-200");
    });

    it("allows individual items to override variant", () => {
      render(
        <ToggleGroup type="single" variant="default">
          <ToggleGroupItem aria-label="Default" value="1">
            Default
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Outline" value="2" variant="outline">
            Outline
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const defaultItem = screen.getByLabelText("Default");
      const outlineItem = screen.getByLabelText("Outline");

      expect(defaultItem).toHaveClass("bg-transparent");
      expect(outlineItem).toHaveClass("border", "border-gray-200");
    });
  });

  describe("Sizes", () => {
    it("applies small size to all items via context", () => {
      render(
        <ToggleGroup size="sm" type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Item");
      expect(item).toHaveClass("h-9", "px-2.5");
    });

    it("applies default size to all items via context", () => {
      render(
        <ToggleGroup size="default" type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Item");
      expect(item).toHaveClass("h-10", "px-3");
    });

    it("applies large size to all items via context", () => {
      render(
        <ToggleGroup size="lg" type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Item");
      expect(item).toHaveClass("h-11", "px-5");
    });

    it("allows individual items to override size", () => {
      render(
        <ToggleGroup size="default" type="single">
          <ToggleGroupItem aria-label="Default" value="1">
            Default
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Large" size="lg" value="2">
            Large
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const defaultItem = screen.getByLabelText("Default");
      const largeItem = screen.getByLabelText("Large");

      expect(defaultItem).toHaveClass("h-10", "px-3");
      expect(largeItem).toHaveClass("h-11", "px-5");
    });
  });

  describe("Disabled State", () => {
    it("disables all items when group is disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <ToggleGroup disabled onValueChange={handleChange} type="single">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const firstButton = screen.getByLabelText("First");
      const secondButton = screen.getByLabelText("Second");

      expect(firstButton).toBeDisabled();
      expect(secondButton).toBeDisabled();

      await user.click(firstButton);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("can disable individual items", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="Enabled" value="enabled">
            Enabled
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Disabled" disabled value="disabled">
            Disabled
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const enabledButton = screen.getByLabelText("Enabled");
      const disabledButton = screen.getByLabelText("Disabled");

      expect(enabledButton).not.toBeDisabled();
      expect(disabledButton).toBeDisabled();

      await user.click(enabledButton);
      expect(enabledButton).toHaveAttribute("data-state", "on");
    });
  });

  describe("Keyboard Navigation", () => {
    it("supports arrow key navigation in single mode", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Third" value="third">
            Third
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const firstButton = screen.getByLabelText("First");
      const secondButton = screen.getByLabelText("Second");
      const thirdButton = screen.getByLabelText("Third");

      firstButton.focus();
      expect(firstButton).toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(secondButton).toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(thirdButton).toHaveFocus();

      await user.keyboard("{ArrowLeft}");
      expect(secondButton).toHaveFocus();
    });

    it("activates items with Space key", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="First" value="first">
            First
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Second" value="second">
            Second
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const firstButton = screen.getByLabelText("First");
      firstButton.focus();

      await user.keyboard(" ");
      expect(firstButton).toHaveAttribute("data-state", "on");
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA role", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(screen.getByRole("group")).toBeInTheDocument();
    });

    it("requires aria-label on items", () => {
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="Accessible item" value="1">
            Icon
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Accessible item");
      expect(item).toBeInTheDocument();
    });

    it("items have proper data-state attribute", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="Item" value="1">
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Item");

      expect(item).toHaveAttribute("data-state", "off");

      await user.click(item);
      expect(item).toHaveAttribute("data-state", "on");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty group", () => {
      render(<ToggleGroup type="single" />);
      expect(screen.getByRole("group")).toBeInTheDocument();
    });

    it("handles single item", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroupItem aria-label="Only" value="only">
            Only
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      const item = screen.getByLabelText("Only");
      await user.click(item);
      expect(item).toHaveAttribute("data-state", "on");
    });

    it("preserves other HTML attributes", () => {
      render(
        <ToggleGroup data-testid="custom-group" type="single">
          <ToggleGroupItem
            aria-label="Item"
            data-testid="custom-item"
            value="1"
          >
            Item
          </ToggleGroupItem>
        </ToggleGroup>,
      );

      expect(screen.getByTestId("custom-group")).toBeInTheDocument();
      expect(screen.getByTestId("custom-item")).toBeInTheDocument();
    });
  });
});

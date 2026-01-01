import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Toggle aria-label="Toggle">Click me</Toggle>);
      const toggle = screen.getByRole("button", { name: /toggle/i });
      expect(toggle).toBeInTheDocument();
      expect(toggle).toHaveTextContent("Click me");
    });

    it("renders with aria-label when used with icon-only content", () => {
      render(<Toggle aria-label="Toggle bold">B</Toggle>);
      const toggle = screen.getByRole("button", { name: /toggle bold/i });
      expect(toggle).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Toggle aria-label="Toggle" className="custom-class">
          Toggle
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("custom-class");
    });

    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(
        <Toggle aria-label="Toggle" ref={ref}>
          Toggle
        </Toggle>,
      );
      expect(ref).toHaveBeenCalled();
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(
        <Toggle aria-label="Toggle" variant="default">
          Default
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("bg-transparent");
    });

    it("renders outline variant", () => {
      render(
        <Toggle aria-label="Toggle" variant="outline">
          Outline
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("border", "border-gray-200", "bg-transparent");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(
        <Toggle aria-label="Toggle" size="sm">
          Small
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("h-9", "px-2.5", "min-w-9");
    });

    it("renders default size", () => {
      render(
        <Toggle aria-label="Toggle" size="default">
          Default
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("h-10", "px-3", "min-w-10");
    });

    it("renders large size", () => {
      render(
        <Toggle aria-label="Toggle" size="lg">
          Large
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("h-11", "px-5", "min-w-11");
    });
  });

  describe("States", () => {
    it("starts in unpressed state by default", () => {
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
      expect(toggle).toHaveAttribute("data-state", "off");
    });

    it("can be controlled with pressed prop", () => {
      render(
        <Toggle aria-label="Toggle" pressed>
          Toggle
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveAttribute("aria-pressed", "true");
      expect(toggle).toHaveAttribute("data-state", "on");
    });

    it("toggles state when clicked (uncontrolled)", async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-pressed", "true");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    it("calls onPressedChange when toggled", async () => {
      const user = userEvent.setup();
      const handlePressedChange = vi.fn();
      render(
        <Toggle aria-label="Toggle" onPressedChange={handlePressedChange}>
          Toggle
        </Toggle>,
      );
      const toggle = screen.getByRole("button");

      await user.click(toggle);
      expect(handlePressedChange).toHaveBeenCalledWith(true);

      await user.click(toggle);
      expect(handlePressedChange).toHaveBeenCalledWith(false);
    });

    it("respects disabled state", async () => {
      const user = userEvent.setup();
      const handlePressedChange = vi.fn();
      render(
        <Toggle
          aria-label="Toggle"
          disabled
          onPressedChange={handlePressedChange}
        >
          Toggle
        </Toggle>,
      );
      const toggle = screen.getByRole("button");

      expect(toggle).toBeDisabled();
      await user.click(toggle);
      expect(handlePressedChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Interaction", () => {
    it("toggles with Space key", async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      toggle.focus();
      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.keyboard(" ");
      expect(toggle).toHaveAttribute("aria-pressed", "true");

      await user.keyboard(" ");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    it("toggles with Enter key", async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      toggle.focus();
      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.keyboard("{Enter}");
      expect(toggle).toHaveAttribute("aria-pressed", "true");

      await user.keyboard("{Enter}");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
    });

    it("is focusable via Tab key", async () => {
      const user = userEvent.setup();
      render(
        <div>
          <button type="button">Before</button>
          <Toggle aria-label="Toggle">Toggle</Toggle>
          <button type="button">After</button>
        </div>,
      );

      const toggle = screen.getByRole("button", { name: /toggle/i });

      await user.tab();
      expect(screen.getByText("Before")).toHaveFocus();

      await user.tab();
      expect(toggle).toHaveFocus();

      await user.tab();
      expect(screen.getByText("After")).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA attributes", () => {
      render(<Toggle aria-label="Toggle italic">Toggle</Toggle>);
      const toggle = screen.getByRole("button", { name: /toggle italic/i });

      expect(toggle).toHaveAttribute("type", "button");
      expect(toggle).toHaveAttribute("aria-pressed");
    });

    it("updates aria-pressed attribute on state change", async () => {
      const user = userEvent.setup();
      render(<Toggle aria-label="Toggle">Toggle</Toggle>);
      const toggle = screen.getByRole("button");

      expect(toggle).toHaveAttribute("aria-pressed", "false");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("works with aria-label for icon-only toggles", () => {
      render(<Toggle aria-label="Toggle bold formatting">B</Toggle>);
      const toggle = screen.getByRole("button", {
        name: /toggle bold formatting/i,
      });
      expect(toggle).toBeInTheDocument();
    });

    it("supports aria-describedby for additional context", () => {
      render(
        <div>
          <Toggle aria-describedby="bold-desc" aria-label="Bold">
            B
          </Toggle>
          <span id="bold-desc">Make text bold</span>
        </div>,
      );
      const toggle = screen.getByRole("button", { name: /bold/i });
      expect(toggle).toHaveAttribute("aria-describedby", "bold-desc");
    });
  });

  describe("Variant Combinations", () => {
    it("renders small outline variant", () => {
      render(
        <Toggle aria-label="Toggle" size="sm" variant="outline">
          Small Outline
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("border", "h-9", "px-2.5");
    });

    it("renders large default variant", () => {
      render(
        <Toggle aria-label="Toggle" size="lg" variant="default">
          Large Default
        </Toggle>,
      );
      const toggle = screen.getByRole("button");
      expect(toggle).toHaveClass("bg-transparent", "h-11", "px-5");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid toggling", async () => {
      const user = userEvent.setup();
      const handlePressedChange = vi.fn();
      render(
        <Toggle aria-label="Toggle" onPressedChange={handlePressedChange}>
          Toggle
        </Toggle>,
      );
      const toggle = screen.getByRole("button");

      await user.click(toggle);
      await user.click(toggle);
      await user.click(toggle);

      expect(handlePressedChange).toHaveBeenCalledTimes(3);
      expect(toggle).toHaveAttribute("aria-pressed", "true");
    });

    it("handles empty children", () => {
      render(<Toggle aria-label="Empty toggle" />);
      const toggle = screen.getByRole("button", { name: /empty toggle/i });
      expect(toggle).toBeInTheDocument();
      expect(toggle).toBeEmptyDOMElement();
    });

    it("preserves other HTML attributes", () => {
      render(
        <Toggle aria-label="Toggle" data-testid="custom-toggle" id="my-toggle">
          Toggle
        </Toggle>,
      );
      const toggle = screen.getByTestId("custom-toggle");
      expect(toggle).toHaveAttribute("id", "my-toggle");
    });
  });
});

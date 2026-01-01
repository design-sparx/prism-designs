/**
 * Checkbox Component Tests
 *
 * Test coverage:
 * - Rendering and basic interaction
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Accessibility (ARIA, roles, keyboard)
 * - Ref forwarding
 * - State changes and event handlers
 *
 * Educational Notes:
 * - Radix UI checkboxes use role="checkbox" instead of native input
 * - Test user-facing behavior (clicking, keyboard navigation)
 * - Check for proper ARIA attributes (aria-checked)
 */

import { createRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("renders unchecked by default", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("applies custom className", () => {
      render(<Checkbox className="custom-class" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("custom-class");
    });

    it("renders with aria-label", () => {
      render(<Checkbox aria-label="Accept terms" />);
      const checkbox = screen.getByRole("checkbox", { name: /accept terms/i });
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Uncontrolled Mode", () => {
    it("can be checked by default with defaultChecked", () => {
      render(<Checkbox defaultChecked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("can be unchecked by default with defaultChecked", () => {
      render(<Checkbox defaultChecked={false} />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("toggles state when clicked in uncontrolled mode", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "true");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled checked prop", () => {
      render(<Checkbox checked />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("calls onCheckedChange when clicked", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox checked={false} onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("works with useState for controlled state", async () => {
      const user = userEvent.setup();

      function ControlledCheckbox(): JSX.Element {
        const [checked, setChecked] = useState(false);
        return <Checkbox checked={checked} onCheckedChange={setChecked} />;
      }

      render(<ControlledCheckbox />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "true");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled when disabled prop is true", () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
      expect(checkbox).toHaveAttribute("data-disabled");
    });

    it("does not respond to clicks when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox disabled onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("does not respond to keyboard when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox disabled onCheckedChange={handleChange} />);
      const checkbox = screen.getByRole("checkbox");

      checkbox.focus();
      await user.keyboard(" ");

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("can be checked with Space key", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      checkbox.focus();
      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.keyboard(" ");
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("can be toggled with Space key", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      checkbox.focus();
      await user.keyboard(" ");
      expect(checkbox).toHaveAttribute("aria-checked", "true");

      await user.keyboard(" ");
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });

    it("is focusable with Tab key", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toHaveFocus();

      await user.tab();

      expect(checkbox).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("role", "checkbox");
    });

    it("has aria-checked attribute", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-checked");
    });

    it("updates aria-checked when state changes", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(checkbox);
      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("supports aria-label for accessibility", () => {
      render(<Checkbox aria-label="Subscribe to newsletter" />);
      const checkbox = screen.getByRole("checkbox", {
        name: /subscribe to newsletter/i,
      });
      expect(checkbox).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      render(
        <>
          <span id="checkbox-label">Terms and Conditions</span>
          <Checkbox aria-labelledby="checkbox-label" />
        </>,
      );
      const checkbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
      });
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to checkbox element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute("role", "checkbox");
    });

    it("ref can be used to focus the checkbox", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Checkbox ref={ref} />);

      expect(ref.current).not.toHaveFocus();

      ref.current?.focus();

      expect(ref.current).toHaveFocus();
    });
  });

  describe("Integration with Label", () => {
    it("works with associated label element", async () => {
      const user = userEvent.setup();

      render(
        <>
          <label htmlFor="terms-checkbox">I agree to terms</label>
          <Checkbox id="terms-checkbox" />
        </>,
      );

      const label = screen.getByText(/i agree to terms/i);
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAttribute("aria-checked", "false");

      await user.click(label);

      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid clicks correctly", async () => {
      const user = userEvent.setup();
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);
      await user.click(checkbox);
      await user.click(checkbox);

      expect(checkbox).toHaveAttribute("aria-checked", "true");
    });

    it("can be required", () => {
      render(<Checkbox required />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });

    it("supports value attribute for forms", () => {
      render(<Checkbox value="agreed" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("value", "agreed");
    });
  });
});

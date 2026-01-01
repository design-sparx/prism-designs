/**
 * RadioGroup Component Tests
 *
 * Test coverage:
 * - Rendering and basic interaction
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Accessibility (ARIA, roles, keyboard)
 * - Ref forwarding
 * - Selection behavior (mutually exclusive)
 *
 * Educational Notes:
 * - Radix UI radio groups use role="radiogroup" and role="radio"
 * - Test user-facing behavior (clicking, keyboard navigation)
 * - Check for proper ARIA attributes (aria-checked)
 * - Only one radio can be selected at a time
 */

import { createRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();
    });

    it("renders multiple radio items", () => {
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
          <RadioGroupItem id="r3" value="option3" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      expect(radios).toHaveLength(3);
    });

    it("applies custom className to RadioGroup", () => {
      render(
        <RadioGroup className="custom-group">
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveClass("custom-group");
    });

    it("applies custom className to RadioGroupItem", () => {
      render(
        <RadioGroup>
          <RadioGroupItem className="custom-item" id="r1" value="option1" />
        </RadioGroup>,
      );
      const radio = screen.getByRole("radio");
      expect(radio).toHaveClass("custom-item");
    });
  });

  describe("Uncontrolled Mode", () => {
    it("can have a default value selected", () => {
      render(
        <RadioGroup defaultValue="option2">
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
          <RadioGroupItem id="r3" value="option3" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
      expect(radios[2]).toHaveAttribute("aria-checked", "false");
    });

    it("changes selection when clicked in uncontrolled mode", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      expect(radios[0]).toHaveAttribute("aria-checked", "true");
      expect(radios[1]).toHaveAttribute("aria-checked", "false");

      await user.click(radios[1]);

      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
    });

    it("only one radio can be selected at a time", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
          <RadioGroupItem id="r3" value="option3" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      await user.click(radios[0]);
      expect(radios[0]).toHaveAttribute("aria-checked", "true");
      expect(radios[1]).toHaveAttribute("aria-checked", "false");
      expect(radios[2]).toHaveAttribute("aria-checked", "false");

      await user.click(radios[1]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
      expect(radios[2]).toHaveAttribute("aria-checked", "false");

      await user.click(radios[2]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "false");
      expect(radios[2]).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled value prop", () => {
      render(
        <RadioGroup value="option2">
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
          <RadioGroupItem id="r3" value="option3" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
      expect(radios[2]).toHaveAttribute("aria-checked", "false");
    });

    it("calls onValueChange when selection changes", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup onValueChange={handleChange} value="option1">
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      await user.click(radios[1]);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("option2");
    });

    it("works with useState for controlled state", async () => {
      const user = userEvent.setup();

      function ControlledRadioGroup(): JSX.Element {
        const [value, setValue] = useState("option1");
        return (
          <RadioGroup onValueChange={setValue} value={value}>
            <RadioGroupItem id="r1" value="option1" />
            <RadioGroupItem id="r2" value="option2" />
            <RadioGroupItem id="r3" value="option3" />
          </RadioGroup>
        );
      }

      render(<ControlledRadioGroup />);
      const radios = screen.getAllByRole("radio");

      expect(radios[0]).toHaveAttribute("aria-checked", "true");
      expect(radios[1]).toHaveAttribute("aria-checked", "false");
      expect(radios[2]).toHaveAttribute("aria-checked", "false");

      await user.click(radios[1]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
      expect(radios[2]).toHaveAttribute("aria-checked", "false");

      await user.click(radios[2]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "false");
      expect(radios[2]).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Disabled State", () => {
    it("renders disabled RadioGroup", () => {
      render(
        <RadioGroup disabled>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      radios.forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it("renders individual disabled RadioGroupItem", () => {
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem disabled id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");
      expect(radios[0]).not.toBeDisabled();
      expect(radios[1]).toBeDisabled();
    });

    it("does not respond to clicks when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup disabled onValueChange={handleChange}>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      await user.click(radios[0]);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not respond to keyboard when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <RadioGroup disabled onValueChange={handleChange}>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      radios[0].focus();
      await user.keyboard(" ");

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard Navigation", () => {
    it("can select radio with Space key", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      radios[0].focus();
      await user.keyboard(" ");
      expect(radios[0]).toHaveAttribute("aria-checked", "true");
    });

    it("is focusable with Tab key", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radio = screen.getByRole("radio");

      expect(radio).not.toHaveFocus();

      await user.tab();

      expect(radio).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has correct role for RadioGroup", () => {
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();
    });

    it("has correct role for RadioGroupItem", () => {
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radio = screen.getByRole("radio");
      expect(radio).toBeInTheDocument();
    });

    it("has aria-checked attribute", () => {
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radio = screen.getByRole("radio");
      expect(radio).toHaveAttribute("aria-checked");
    });

    it("updates aria-checked when state changes", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      expect(radios[0]).toHaveAttribute("aria-checked", "false");

      await user.click(radios[0]);
      expect(radios[0]).toHaveAttribute("aria-checked", "true");

      await user.click(radios[1]);
      expect(radios[0]).toHaveAttribute("aria-checked", "false");
      expect(radios[1]).toHaveAttribute("aria-checked", "true");
    });

    it("supports aria-label on RadioGroup", () => {
      render(
        <RadioGroup aria-label="Choose an option">
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radiogroup = screen.getByRole("radiogroup", {
        name: /choose an option/i,
      });
      expect(radiogroup).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to RadioGroup element", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <RadioGroup ref={ref}>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "radiogroup");
    });

    it("forwards ref to RadioGroupItem element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" ref={ref} value="option1" />
        </RadioGroup>,
      );

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute("role", "radio");
    });

    it("ref can be used to focus a radio item", () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" ref={ref} value="option1" />
        </RadioGroup>,
      );

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
          <label htmlFor="radio-option">Option 1</label>
          <RadioGroup>
            <RadioGroupItem id="radio-option" value="option1" />
          </RadioGroup>
        </>,
      );

      const label = screen.getByText(/option 1/i);
      const radio = screen.getByRole("radio");

      expect(radio).toHaveAttribute("aria-checked", "false");

      await user.click(label);

      expect(radio).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid clicks correctly", async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup>
          <RadioGroupItem id="r1" value="option1" />
          <RadioGroupItem id="r2" value="option2" />
        </RadioGroup>,
      );
      const radios = screen.getAllByRole("radio");

      await user.click(radios[0]);
      await user.click(radios[1]);
      await user.click(radios[0]);

      expect(radios[0]).toHaveAttribute("aria-checked", "true");
      expect(radios[1]).toHaveAttribute("aria-checked", "false");
    });

    it("can be required", () => {
      render(
        <RadioGroup required>
          <RadioGroupItem id="r1" value="option1" />
        </RadioGroup>,
      );
      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toHaveAttribute("aria-required", "true");
    });
  });
});

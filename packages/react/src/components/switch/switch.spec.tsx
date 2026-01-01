/**
 * Switch Component Tests
 *
 * Test coverage:
 * - Rendering and basic interaction
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Accessibility (ARIA, roles, keyboard)
 * - Ref forwarding
 * - Toggle behavior
 *
 * Educational Notes:
 * - Radix UI switch uses role="switch" with aria-checked
 * - Test user-facing behavior (clicking, keyboard navigation)
 * - Switches are binary controls (on/off, checked/unchecked)
 * - Unlike checkboxes, switches show immediate effect
 */

import { createRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { Switch } from "./switch";

describe("Switch", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Switch />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    it("renders in unchecked state by default", () => {
      render(<Switch />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    it("applies custom className", () => {
      render(<Switch className="custom-switch" />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveClass("custom-switch");
    });
  });

  describe("Uncontrolled Mode", () => {
    it("can have a default checked state", () => {
      render(<Switch defaultChecked />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("toggles when clicked in uncontrolled mode", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "true");

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled checked prop", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function -- Test needs empty onChange
      render(<Switch checked onCheckedChange={() => {}} />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("calls onCheckedChange when toggled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Switch checked={false} onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole("switch");

      await user.click(switchElement);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it("works with useState for controlled state", async () => {
      const user = userEvent.setup();

      function ControlledSwitch(): JSX.Element {
        const [checked, setChecked] = useState(false);
        return (
          <div>
            <Switch checked={checked} onCheckedChange={setChecked} />
            <span data-testid="status">{checked ? "On" : "Off"}</span>
          </div>
        );
      }

      render(<ControlledSwitch />);
      const switchElement = screen.getByRole("switch");
      const status = screen.getByTestId("status");

      expect(switchElement).toHaveAttribute("aria-checked", "false");
      expect(status).toHaveTextContent("Off");

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "true");
      expect(status).toHaveTextContent("On");

      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "false");
      expect(status).toHaveTextContent("Off");
    });
  });

  describe("Disabled State", () => {
    it("renders disabled switch", () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeDisabled();
    });

    it("does not respond to clicks when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Switch disabled onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole("switch");

      await user.click(switchElement);

      expect(handleChange).not.toHaveBeenCalled();
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    it("does not respond to keyboard when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Switch disabled onCheckedChange={handleChange} />);
      const switchElement = screen.getByRole("switch");

      switchElement.focus();
      await user.keyboard(" ");

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("applies disabled styling", () => {
      render(<Switch disabled />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveClass("disabled:cursor-not-allowed");
      expect(switchElement).toHaveClass("disabled:opacity-50");
    });
  });

  describe("Keyboard Navigation", () => {
    it("can toggle with Space key", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      switchElement.focus();
      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.keyboard(" ");
      expect(switchElement).toHaveAttribute("aria-checked", "true");

      await user.keyboard(" ");
      expect(switchElement).toHaveAttribute("aria-checked", "false");
    });

    it("can toggle with Enter key", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      switchElement.focus();
      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.keyboard("{Enter}");
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("is focusable with Tab key", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      expect(switchElement).not.toHaveFocus();

      await user.tab();

      expect(switchElement).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Switch />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeInTheDocument();
    });

    it("has aria-checked attribute", () => {
      render(<Switch />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-checked");
    });

    it("updates aria-checked when state changes", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("supports aria-label", () => {
      render(<Switch aria-label="Enable notifications" />);
      const switchElement = screen.getByRole("switch", {
        name: /enable notifications/i,
      });
      expect(switchElement).toBeInTheDocument();
    });

    it("can be required", () => {
      render(<Switch required />);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toHaveAttribute("aria-required", "true");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to switch element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Switch ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute("role", "switch");
    });

    it("ref can be used to focus switch", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Switch ref={ref} />);

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
          <label htmlFor="airplane-mode">Airplane Mode</label>
          <Switch id="airplane-mode" />
        </>,
      );

      const label = screen.getByText(/airplane mode/i);
      const switchElement = screen.getByRole("switch");

      expect(switchElement).toHaveAttribute("aria-checked", "false");

      await user.click(label);

      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid clicks correctly", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      await user.click(switchElement);
      await user.click(switchElement);
      await user.click(switchElement);

      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });

    it("handles rapid keyboard toggles", async () => {
      const user = userEvent.setup();
      render(<Switch />);
      const switchElement = screen.getByRole("switch");

      switchElement.focus();
      await user.keyboard(" ");
      await user.keyboard(" ");
      await user.keyboard(" ");

      expect(switchElement).toHaveAttribute("aria-checked", "true");
    });
  });
});

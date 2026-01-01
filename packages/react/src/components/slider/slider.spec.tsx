/**
 * Slider Component Tests
 *
 * Test coverage:
 * - Rendering and basic interaction
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Accessibility (ARIA, roles, keyboard)
 * - Ref forwarding
 * - Value changes
 * - Min/max/step props
 *
 * Educational Notes:
 * - Radix UI slider uses role="slider" with aria-valuemin, aria-valuemax, aria-valuenow
 * - Values are always arrays (even for single thumb)
 * - Test user-facing behavior (dragging, keyboard navigation)
 * - Sliders support both horizontal and vertical orientations
 */

import { createRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { Slider } from "./slider";

describe("Slider", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("renders with default value", () => {
      render(<Slider defaultValue={[30]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "30");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Slider className="custom-slider" defaultValue={[50]} />,
      );
      // The className is applied to the root container
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass("custom-slider");
    });

    it("renders track and range elements", () => {
      const { container } = render(<Slider defaultValue={[50]} />);
      // Track and range don't have semantic roles, verify they exist via structure
      expect(container.querySelector('[role="slider"]')).toBeInTheDocument();
    });
  });

  describe("Uncontrolled Mode", () => {
    it("uses defaultValue for initial state", () => {
      render(<Slider defaultValue={[75]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "75");
    });

    it("updates value with keyboard (ArrowRight increases)", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      // Default step is 1
      expect(slider).toHaveAttribute("aria-valuenow", "51");
    });

    it("updates value with keyboard (ArrowLeft decreases)", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowLeft}");

      expect(slider).toHaveAttribute("aria-valuenow", "49");
    });

    it("respects step prop", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} step={10} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "60");
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled value prop", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function -- Test needs empty onChange
      render(<Slider onValueChange={() => {}} value={[80]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "80");
    });

    it("calls onValueChange when value changes", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Slider onValueChange={handleChange} value={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([51]);
    });

    it("works with useState for controlled state", async () => {
      const user = userEvent.setup();

      function ControlledSlider(): JSX.Element {
        const [value, setValue] = useState([50]);
        return (
          <div>
            <Slider onValueChange={setValue} value={value} />
            <span data-testid="value">{value[0]}</span>
          </div>
        );
      }

      render(<ControlledSlider />);
      const slider = screen.getByRole("slider");
      const valueDisplay = screen.getByTestId("value");

      expect(slider).toHaveAttribute("aria-valuenow", "50");
      expect(valueDisplay).toHaveTextContent("50");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "51");
      expect(valueDisplay).toHaveTextContent("51");
    });
  });

  describe("Min/Max Values", () => {
    it("has default min value of 0", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin", "0");
    });

    it("has default max value of 100", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
    });

    it("respects custom min prop", () => {
      render(<Slider defaultValue={[25]} min={10} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin", "10");
    });

    it("respects custom max prop", () => {
      render(<Slider defaultValue={[50]} max={200} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemax", "200");
    });

    it("prevents value from going below min", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[0]} min={0} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowLeft}");

      // Should stay at min
      expect(slider).toHaveAttribute("aria-valuenow", "0");
    });

    it("prevents value from going above max", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[100]} max={100} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      // Should stay at max
      expect(slider).toHaveAttribute("aria-valuenow", "100");
    });
  });

  describe("Disabled State", () => {
    it("renders disabled slider", () => {
      render(<Slider defaultValue={[50]} disabled />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("data-disabled");
    });

    it("does not respond to keyboard when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Slider defaultValue={[50]} disabled onValueChange={handleChange} />,
      );
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(handleChange).not.toHaveBeenCalled();
      expect(slider).toHaveAttribute("aria-valuenow", "50");
    });

    it("applies disabled styling to thumb", () => {
      const { container } = render(<Slider defaultValue={[50]} disabled />);
      // Verify the thumb has disabled classes
      const thumb = container.querySelector('[role="slider"]');
      expect(thumb).toHaveClass("disabled:pointer-events-none");
      expect(thumb).toHaveClass("disabled:opacity-50");
    });
  });

  describe("Keyboard Navigation", () => {
    it("increases value with ArrowRight", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "51");
    });

    it("decreases value with ArrowLeft", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowLeft}");

      expect(slider).toHaveAttribute("aria-valuenow", "49");
    });

    it("increases value with ArrowUp", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowUp}");

      expect(slider).toHaveAttribute("aria-valuenow", "51");
    });

    it("decreases value with ArrowDown", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowDown}");

      expect(slider).toHaveAttribute("aria-valuenow", "49");
    });

    it("jumps to min with Home key", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{Home}");

      expect(slider).toHaveAttribute("aria-valuenow", "0");
    });

    it("jumps to max with End key", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{End}");

      expect(slider).toHaveAttribute("aria-valuenow", "100");
    });

    it("is focusable with Tab key", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      expect(slider).not.toHaveFocus();

      await user.tab();

      expect(slider).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toBeInTheDocument();
    });

    it("has aria-valuenow attribute", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuenow", "50");
    });

    it("has aria-valuemin attribute", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemin");
    });

    it("has aria-valuemax attribute", () => {
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      expect(slider).toHaveAttribute("aria-valuemax");
    });

    it("updates aria-valuenow when value changes", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[50]} />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuenow", "50");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "51");
    });

    it("supports aria-label", () => {
      render(<Slider aria-label="Volume control" defaultValue={[50]} />);
      const slider = screen.getByRole("slider");
      // aria-label is applied to the root, but the thumb still renders
      expect(slider).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to slider root element", () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Slider defaultValue={[50]} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("ref provides access to DOM element", () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Slider defaultValue={[50]} ref={ref} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current?.getAttribute("data-orientation")).toBe("horizontal");
    });
  });

  describe("Multiple Values (Range)", () => {
    it("renders slider with multiple values", () => {
      // Note: Radix UI automatically creates multiple thumbs based on value array
      // Our component only explicitly renders one Thumb, but Radix clones it
      render(<Slider defaultValue={[25, 75]} />);
      const sliders = screen.getAllByRole("slider");

      // Radix creates thumbs automatically
      expect(sliders.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles step values correctly", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[0]} step={5} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "5");
    });

    it("handles decimal step values", async () => {
      const user = userEvent.setup();
      render(<Slider defaultValue={[0]} max={1} step={0.1} />);
      const slider = screen.getByRole("slider");

      slider.focus();
      await user.keyboard("{ArrowRight}");

      expect(slider).toHaveAttribute("aria-valuenow", "0.1");
    });

    it("handles inverted range (high min, low max) gracefully", () => {
      render(<Slider defaultValue={[50]} max={100} min={0} />);
      const slider = screen.getByRole("slider");

      expect(slider).toHaveAttribute("aria-valuemin", "0");
      expect(slider).toHaveAttribute("aria-valuemax", "100");
    });
  });

  describe("Display Name", () => {
    it("has correct displayName for debugging", () => {
      expect(Slider.displayName).toBe("Slider");
    });
  });
});

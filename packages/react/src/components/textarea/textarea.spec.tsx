/**
 * Textarea Component Tests
 *
 * Test coverage:
 * - Rendering and basic interaction
 * - Controlled and uncontrolled modes
 * - Disabled state
 * - Accessibility (ARIA, roles, keyboard)
 * - Ref forwarding
 * - Multi-line text input
 *
 * Educational Notes:
 * - Native textarea elements use role="textbox" with multiline=true
 * - Test user-facing behavior (typing, focus, blur)
 * - Check for proper ARIA attributes
 * - Verify textarea-specific features (rows, cols, resize)
 */

import { createRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("renders with placeholder text", () => {
      render(<Textarea placeholder="Enter your message..." />);
      const textarea = screen.getByPlaceholderText(/enter your message/i);
      expect(textarea).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Textarea className="custom-textarea" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("custom-textarea");
    });

    it("renders with default minimum height", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("min-h-20");
    });
  });

  describe("Uncontrolled Mode", () => {
    it("can have a default value", () => {
      render(<Textarea defaultValue="Initial text" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("Initial text");
    });

    it("accepts user input in uncontrolled mode", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Hello, world!");

      expect(textarea).toHaveValue("Hello, world!");
    });

    it("accepts multi-line input", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Line 1{Enter}Line 2{Enter}Line 3");

      expect(textarea).toHaveValue("Line 1\nLine 2\nLine 3");
    });
  });

  describe("Controlled Mode", () => {
    it("respects controlled value prop", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function -- Test needs empty onChange
      render(<Textarea onChange={() => {}} value="Controlled text" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("Controlled text");
    });

    it("calls onChange when text changes", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Textarea onChange={handleChange} value="" />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "A");

      expect(handleChange).toHaveBeenCalled();
    });

    it("works with useState for controlled state", async () => {
      const user = userEvent.setup();

      function ControlledTextarea(): JSX.Element {
        const [value, setValue] = useState("");
        return (
          <div>
            <Textarea
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
            />
            <span data-testid="output">{value}</span>
          </div>
        );
      }

      render(<ControlledTextarea />);
      const textarea = screen.getByRole("textbox");
      const output = screen.getByTestId("output");

      expect(textarea).toHaveValue("");
      expect(output).toHaveTextContent("");

      await user.type(textarea, "Hello");

      expect(textarea).toHaveValue("Hello");
      expect(output).toHaveTextContent("Hello");
    });
  });

  describe("Disabled State", () => {
    it("renders disabled textarea", () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeDisabled();
    });

    it("does not accept input when disabled", async () => {
      const user = userEvent.setup();
      render(<Textarea disabled />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Should not work");

      expect(textarea).toHaveValue("");
    });

    it("applies disabled styling", () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("disabled:cursor-not-allowed");
      expect(textarea).toHaveClass("disabled:opacity-50");
    });
  });

  describe("Keyboard Interaction", () => {
    it("is focusable with Tab key", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      expect(textarea).not.toHaveFocus();

      await user.tab();

      expect(textarea).toHaveFocus();
    });

    it("supports Enter key for new lines", async () => {
      const user = userEvent.setup();
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");

      await user.click(textarea);
      await user.keyboard("First line{Enter}Second line");

      expect(textarea).toHaveValue("First line\nSecond line");
    });

    it("can be cleared with keyboard selection and delete", async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="Delete me" />);
      const textarea = screen.getByRole("textbox");

      await user.click(textarea);
      await user.keyboard("{Control>}a{/Control}{Backspace}");

      expect(textarea).toHaveValue("");
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Textarea />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Textarea aria-label="Message input" />);
      const textarea = screen.getByRole("textbox", { name: /message input/i });
      expect(textarea).toBeInTheDocument();
    });

    it("supports aria-describedby for error messages", () => {
      render(
        <>
          <Textarea aria-describedby="error-message" />
          <span id="error-message">This field is required</span>
        </>,
      );
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-describedby", "error-message");
    });

    it("can be required", () => {
      render(<Textarea required />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toBeRequired();
    });

    it("supports aria-invalid for validation states", () => {
      render(<Textarea aria-invalid="true" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to textarea element", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
      expect(ref.current?.tagName).toBe("TEXTAREA");
    });

    it("ref can be used to focus textarea", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(<Textarea ref={ref} />);

      expect(ref.current).not.toHaveFocus();

      ref.current?.focus();

      expect(ref.current).toHaveFocus();
    });

    it("ref can be used to get textarea value", async () => {
      const ref = createRef<HTMLTextAreaElement>();
      const user = userEvent.setup();

      render(<Textarea ref={ref} />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Test value");

      expect(ref.current?.value).toBe("Test value");
    });
  });

  describe("Integration with Label", () => {
    it("works with associated label element", async () => {
      const user = userEvent.setup();

      render(
        <>
          <label htmlFor="message">Message</label>
          <Textarea id="message" />
        </>,
      );

      const label = screen.getByText(/message/i);
      const textarea = screen.getByRole("textbox");

      await user.click(label);

      expect(textarea).toHaveFocus();
    });
  });

  describe("Native Textarea Attributes", () => {
    it("supports rows attribute", () => {
      render(<Textarea rows={5} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("rows", "5");
    });

    it("supports cols attribute", () => {
      render(<Textarea cols={50} />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("cols", "50");
    });

    it("supports maxLength attribute", async () => {
      const user = userEvent.setup();
      render(<Textarea maxLength={10} />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "12345678901234567890");

      expect(textarea).toHaveValue("1234567890");
    });

    it("supports name attribute for forms", () => {
      render(<Textarea name="user-message" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("name", "user-message");
    });

    it("supports readOnly attribute", async () => {
      const user = userEvent.setup();
      render(<Textarea defaultValue="Read only" readOnly />);
      const textarea = screen.getByRole("textbox");

      await user.type(textarea, "Should not change");

      expect(textarea).toHaveValue("Read only");
    });
  });

  describe("Focus and Blur Events", () => {
    it("calls onFocus when focused", async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();

      render(<Textarea onFocus={handleFocus} />);
      const textarea = screen.getByRole("textbox");

      await user.click(textarea);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when focus is lost", async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(<Textarea onBlur={handleBlur} />);
      const textarea = screen.getByRole("textbox");

      await user.click(textarea);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("handles empty value", () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function -- Test needs empty onChange
      render(<Textarea onChange={() => {}} value="" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveValue("");
    });
  });
});

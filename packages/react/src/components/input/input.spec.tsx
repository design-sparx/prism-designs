/**
 * Input Component Tests
 *
 * Test coverage:
 * - Rendering with different input types
 * - User interactions (typing, change events)
 * - Accessibility (labels, ARIA attributes)
 * - Ref forwarding
 * - Disabled state
 * - File input handling
 * - HTML input attributes
 *
 * Educational Notes:
 * - Test user-facing behavior, not implementation details
 * - Use userEvent for realistic interactions
 * - Query by accessibility roles for better tests
 * - Test edge cases (empty values, special characters)
 */

import * as React from "react";
import { createRef } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { Input } from "./input";

describe("Input", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("renders with placeholder text", () => {
      render(<Input placeholder="Enter email" />);
      expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    it("renders with different input types", () => {
      const types = [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
      ] as const;

      types.forEach((type) => {
        const { container } = render(<Input type={type} />);
        const input = container.querySelector(`input[type="${type}"]`);
        expect(input).toBeInTheDocument();
      });
    });

    it("applies custom className", () => {
      const { container } = render(<Input className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("renders with a value", () => {
      render(<Input readOnly value="test value" />);
      const input = screen.getByRole("textbox");
      expect(input.value).toBe("test value");
    });
  });

  describe("User Interactions", () => {
    it("handles text input", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Type here" />);

      const input = screen.getByPlaceholderText("Type here");
      await user.type(input, "Hello World");

      expect(input).toHaveValue("Hello World");
    });

    it("triggers onChange event", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      await user.type(input, "a");

      expect(handleChange).toHaveBeenCalled();
    });

    it("handles clearing input", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="initial value" />);

      const input = screen.getByRole("textbox");
      await user.clear(input);

      expect(input).toHaveValue("");
    });

    it("handles special characters", async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole("textbox");
      await user.type(input, "Test@123!#$");

      expect(input).toHaveValue("Test@123!#$");
    });

    it("does not trigger onChange when disabled", async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole("textbox");

      // Try to type in disabled input
      await user.type(input, "test");

      expect(handleChange).not.toHaveBeenCalled();
      expect(input).toHaveValue("");
    });
  });

  describe("Accessibility", () => {
    it("supports aria-label", () => {
      render(<Input aria-label="Email address" />);
      expect(
        screen.getByRole("textbox", { name: /email address/i }),
      ).toBeInTheDocument();
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Input aria-describedby="input-description" />
          <div id="input-description">Enter your email</div>
        </>,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "input-description");
    });

    it("supports aria-invalid for error states", () => {
      render(<Input aria-invalid="true" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("supports required attribute", () => {
      render(<Input required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("associates with label via htmlFor", () => {
      render(
        <>
          <label htmlFor="email-input">Email</label>
          <Input id="email-input" />
        </>,
      );

      const input = screen.getByRole("textbox", { name: /email/i });
      expect(input).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("prevents user interaction when disabled", async () => {
      const user = userEvent.setup();
      render(<Input disabled />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");

      expect(input).toHaveValue("");
    });

    it("shows disabled cursor style", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("disabled:cursor-not-allowed");
    });
  });

  describe("Input Types", () => {
    it("handles email type", () => {
      render(<Input type="email" />);
      const input = screen.getByRole("textbox");
      expect(input.type).toBe("email");
    });

    it("handles password type", () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it("handles number type", () => {
      render(<Input type="number" />);
      const input = screen.getByRole("spinbutton");
      expect(input).toBeInTheDocument();
    });

    it("handles file type", () => {
      const { container } = render(<Input type="file" />);
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe("INPUT");
    });

    it("allows focus via ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it("allows accessing input value via ref", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Input defaultValue="test value" ref={ref} />);

      expect(ref.current?.value).toBe("test value");
    });
  });

  describe("HTML Input Attributes", () => {
    it("supports name attribute", () => {
      render(<Input name="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("name", "email");
    });

    it("supports maxLength attribute", () => {
      render(<Input maxLength={10} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("maxLength", "10");
    });

    it("supports pattern attribute", () => {
      render(<Input pattern="[A-Za-z]+" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("pattern", "[A-Za-z]+");
    });

    it("supports autoComplete attribute", () => {
      render(<Input autoComplete="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("autoComplete", "email");
    });

    it("supports readOnly attribute", () => {
      render(<Input readOnly value="read only" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("readOnly");
    });
  });

  describe("Form Integration", () => {
    it("works in a form", async () => {
      const handleSubmit = vi.fn((e: React.FormEvent) => {
        e.preventDefault();
      });
      const user = userEvent.setup();

      render(
        <form onSubmit={handleSubmit}>
          <Input name="email" />
          <button type="submit">Submit</button>
        </form>,
      );

      const input = screen.getByRole("textbox");
      await user.type(input, "test@example.com");

      const submitButton = screen.getByRole("button");
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("supports controlled input pattern", async () => {
      function ControlledInput(): React.ReactElement {
        const [value, setValue] = React.useState("");
        return (
          <Input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            placeholder="Controlled"
            value={value}
          />
        );
      }

      const user = userEvent.setup();
      render(<ControlledInput />);

      const input = screen.getByPlaceholderText("Controlled");
      await user.type(input, "controlled value");

      expect(input).toHaveValue("controlled value");
    });

    it("supports uncontrolled input pattern", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="uncontrolled" />);

      const input = screen.getByRole("textbox");
      await user.clear(input);
      await user.type(input, "new value");

      expect(input).toHaveValue("new value");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string value", () => {
      render(<Input readOnly value="" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
    });

    it("handles very long text", async () => {
      const user = userEvent.setup();
      const longText = "a".repeat(100);

      render(<Input />);
      const input = screen.getByRole("textbox");

      await user.type(input, longText);
      expect(input).toHaveValue(longText);
    });

    it("renders without crashing when no props provided", () => {
      const { container } = render(<Input />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

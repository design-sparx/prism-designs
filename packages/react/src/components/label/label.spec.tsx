/**
 * Label Component Tests
 *
 * Test coverage:
 * - Rendering with different props
 * - Association with form controls (htmlFor)
 * - Disabled state styling
 * - Accessibility attributes
 * - Ref forwarding
 * - Click behavior (label activation)
 *
 * Educational Notes:
 * - Labels improve form accessibility by describing controls
 * - htmlFor connects the label to its control (makes it clickable)
 * - Test the user-facing behavior (clicking label focuses input)
 * - Query by text content since labels don't have a specific role
 */

import { createRef } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import { Label } from "./label";

describe("Label", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Label>Email Address</Label>);
      expect(screen.getByText("Email Address")).toBeInTheDocument();
    });

    it("renders with htmlFor attribute", () => {
      render(<Label htmlFor="email">Email Address</Label>);
      const label = screen.getByText("Email Address");
      expect(label).toHaveAttribute("for", "email");
    });

    it("applies custom className", () => {
      render(<Label className="custom-class">Custom Label</Label>);
      const label = screen.getByText("Custom Label");
      expect(label).toHaveClass("custom-class");
    });

    it("renders children correctly", () => {
      render(<Label>Test Content</Label>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with complex children", () => {
      render(
        <Label>
          <span>Required</span>
          <span> *</span>
        </Label>,
      );
      expect(screen.getByText("Required")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styles when disabled prop is true", () => {
      render(<Label disabled>Disabled Label</Label>);
      const label = screen.getByText("Disabled Label");
      expect(label).toHaveClass("opacity-50");
      expect(label).toHaveClass("cursor-not-allowed");
    });

    it("does not apply disabled styles by default", () => {
      render(<Label>Normal Label</Label>);
      const label = screen.getByText("Normal Label");
      expect(label).not.toHaveClass("opacity-50");
      expect(label).toHaveClass("cursor-pointer");
    });

    it("combines disabled styles with custom className", () => {
      render(
        <Label className="custom-class" disabled>
          Custom Disabled
        </Label>,
      );
      const label = screen.getByText("Custom Disabled");
      expect(label).toHaveClass("opacity-50");
      expect(label).toHaveClass("custom-class");
    });
  });

  describe("Form Control Association", () => {
    it("focuses input when label is clicked", async () => {
      const user = userEvent.setup();

      render(
        <>
          <Label htmlFor="test-input">Username</Label>
          <input id="test-input" type="text" />
        </>,
      );

      const label = screen.getByText("Username");
      const input = screen.getByRole("textbox");

      expect(input).not.toHaveFocus();

      await user.click(label);

      expect(input).toHaveFocus();
    });

    it("activates checkbox when label is clicked", async () => {
      const user = userEvent.setup();

      render(
        <>
          <Label htmlFor="terms">Accept terms</Label>
          <input id="terms" type="checkbox" />
        </>,
      );

      const label = screen.getByText("Accept terms");
      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await user.click(label);

      expect(checkbox).toBeChecked();
    });

    it("works with radio buttons", async () => {
      const user = userEvent.setup();

      render(
        <>
          <Label htmlFor="option-a">Option A</Label>
          <input id="option-a" name="options" type="radio" />
          <Label htmlFor="option-b">Option B</Label>
          <input id="option-b" name="options" type="radio" />
        </>,
      );

      const labelA = screen.getByText("Option A");
      const radioA = document.getElementById("option-a") as HTMLInputElement;

      expect(radioA).not.toBeChecked();

      await user.click(labelA);

      expect(radioA).toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("renders as a label element", () => {
      render(<Label>Accessible Label</Label>);
      const label = screen.getByText("Accessible Label");
      expect(label.tagName).toBe("LABEL");
    });

    it("supports aria-label attribute", () => {
      render(<Label aria-label="Hidden label text">Visible Text</Label>);
      const label = screen.getByText("Visible Text");
      expect(label).toHaveAttribute("aria-label", "Hidden label text");
    });

    it("supports aria-describedby attribute", () => {
      render(
        <>
          <Label aria-describedby="password-hint" htmlFor="password">
            Password
          </Label>
          <div id="password-hint">Must be at least 8 characters</div>
          <input id="password" type="password" />
        </>,
      );

      const label = screen.getByText("Password");
      expect(label).toHaveAttribute("aria-describedby", "password-hint");
    });

    it("maintains association through htmlFor and id pairing", () => {
      render(
        <>
          <Label htmlFor="email-field">Email</Label>
          <input id="email-field" type="email" />
        </>,
      );

      const label = screen.getByText("Email");
      const input = screen.getByRole("textbox");

      // Verify the association
      expect(label).toHaveAttribute("for", "email-field");
      expect(input).toHaveAttribute("id", "email-field");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to label element", () => {
      const ref = createRef<HTMLLabelElement>();

      render(<Label ref={ref}>Label with Ref</Label>);

      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
      expect(ref.current?.tagName).toBe("LABEL");
    });

    it("ref contains the label text", () => {
      const ref = createRef<HTMLLabelElement>();

      render(<Label ref={ref}>Test Label</Label>);

      expect(ref.current?.textContent).toBe("Test Label");
    });

    it("ref can be used to access htmlFor attribute", () => {
      const ref = createRef<HTMLLabelElement>();

      render(
        <Label htmlFor="test-id" ref={ref}>
          Label
        </Label>,
      );

      expect(ref.current?.htmlFor).toBe("test-id");
    });
  });

  describe("HTML Label Attributes", () => {
    it("supports form attribute", () => {
      render(<Label form="my-form">Form Label</Label>);
      const label = screen.getByText("Form Label");
      expect(label).toHaveAttribute("form", "my-form");
    });

    it("supports data attributes", () => {
      render(<Label data-testid="test-label">Data Label</Label>);
      expect(screen.getByTestId("test-label")).toBeInTheDocument();
    });

    it("supports custom attributes", () => {
      render(
        <Label data-custom="custom-value" data-index={1}>
          Custom Attrs
        </Label>,
      );
      const label = screen.getByText("Custom Attrs");
      expect(label).toHaveAttribute("data-custom", "custom-value");
    });
  });

  describe("Edge Cases", () => {
    it("renders without htmlFor attribute", () => {
      // Valid when label wraps its input
      render(<Label>Standalone Label</Label>);
      expect(screen.getByText("Standalone Label")).toBeInTheDocument();
    });

    it("renders with empty string as children", () => {
      const { container } = render(<Label />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles very long text content", () => {
      const longText = "A".repeat(200);
      render(<Label>{longText}</Label>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("combines disabled styles with custom className", () => {
      render(
        <Label className="underline" disabled>
          Multiple Classes
        </Label>,
      );
      const label = screen.getByText("Multiple Classes");
      // Should have disabled styles and custom className
      expect(label).toHaveClass("opacity-50"); // disabled
      expect(label).toHaveClass("cursor-not-allowed"); // disabled
      expect(label).toHaveClass("underline"); // custom
    });
  });

  describe("Label Wrapping Input Pattern", () => {
    it("works when label wraps its input (no htmlFor needed)", async () => {
      const user = userEvent.setup();

      render(
        <Label>
          Email
          <input type="email" />
        </Label>,
      );

      const label = screen.getByText("Email");
      const input = screen.getByRole("textbox");

      expect(input).not.toHaveFocus();

      // Click the label text (not the input)
      await user.click(label);

      expect(input).toHaveFocus();
    });

    it("checkbox wrapper pattern activates checkbox", async () => {
      const user = userEvent.setup();

      render(
        <Label>
          <input type="checkbox" />I agree to the terms
        </Label>,
      );

      const checkbox = screen.getByRole("checkbox");
      const labelText = screen.getByText("I agree to the terms");

      expect(checkbox).not.toBeChecked();

      await user.click(labelText);

      expect(checkbox).toBeChecked();
    });
  });
});

/**
 * Button Component Tests
 *
 * Test coverage:
 * - Rendering variants and sizes
 * - User interactions (click, keyboard)
 * - Accessibility (ARIA, roles)
 * - Polymorphism (asChild prop)
 * - Ref forwarding
 * - Disabled state
 *
 * Educational Notes:
 * - Use describe blocks for organization
 * - Test user-facing behavior, not implementation
 * - Query by accessibility roles for better tests
 * - Use userEvent for realistic interactions
 */

import { createRef } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen } from "../../test/utils";

import { Button } from "./button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i }),
      ).toBeInTheDocument();
    });

    it("renders all variant options", () => {
      const variants = [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "destructive",
      ] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <Button variant={variant}>{variant}</Button>,
        );
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it("renders all size options", () => {
      const sizes = ["sm", "md", "lg", "icon"] as const;

      sizes.forEach((size) => {
        const { container } = render(<Button size={size}>Button</Button>);
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it("applies custom className", () => {
      const { container } = render(
        <Button className="custom-class">Button</Button>,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("renders children correctly", () => {
      render(<Button>Test Content</Button>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("handles click events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not trigger click when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();

      // Attempting to click a disabled button should not trigger handler
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("supports keyboard activation with Enter", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Press Enter</Button>);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard activation with Space", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Press Space</Button>);

      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(
        screen.getByRole("button", { name: /close dialog/i }),
      ).toBeInTheDocument();
    });

    it("indicates disabled state", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("disabled");
    });

    it("supports aria-describedby", () => {
      render(
        <>
          <Button aria-describedby="btn-description">Submit</Button>
          <div id="btn-description">Submit the form</div>
        </>,
      );

      const button = screen.getByRole("button", { name: /submit/i });
      expect(button).toHaveAttribute("aria-describedby", "btn-description");
    });
  });

  describe("Polymorphism (asChild)", () => {
    it("renders as a link when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/home">Go Home</a>
        </Button>,
      );

      const link = screen.getByRole("link", { name: /go home/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/home");
    });

    it("applies button styles to child element", () => {
      const { container } = render(
        <Button asChild variant="primary">
          <a href="/home">Link</a>
        </Button>,
      );

      // Button classes should be applied to the link
      const link = container.querySelector("a");
      expect(link).toHaveClass("inline-flex");
    });

    it("forwards props to child element when asChild is true", () => {
      render(
        <Button asChild data-testid="polymorphic-button">
          <span>Custom Element</span>
        </Button>,
      );

      const element = screen.getByTestId("polymorphic-button");
      expect(element.tagName).toBe("SPAN");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to button element", () => {
      const ref = createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe("BUTTON");
    });

    it("ref contains the button text", () => {
      const ref = createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Test Button</Button>);

      expect(ref.current?.textContent).toBe("Test Button");
    });
  });

  describe("HTML Button Attributes", () => {
    it("supports type attribute", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("supports name attribute", () => {
      render(<Button name="action">Action</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("name", "action");
    });

    it("supports value attribute", () => {
      render(<Button value="submit-value">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute(
        "value",
        "submit-value",
      );
    });

    it("supports form attribute", () => {
      render(<Button form="my-form">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("form", "my-form");
    });
  });

  describe("Edge Cases", () => {
    it("renders with no children", () => {
      const { container } = render(<Button />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders with complex children", () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>,
      );

      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });

    it("handles undefined variant and size gracefully", () => {
      const { container } = render(
        <Button size={undefined} variant={undefined}>
          Button
        </Button>,
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

/**
 * Spinner Component Tests
 *
 * Test coverage:
 * - Rendering sizes
 * - Accessibility attributes
 * - Custom className
 * - SVG element attributes
 * - forwardRef functionality
 *
 * Educational Notes:
 * - Spinner is an SVG element, not a button/div
 * - Test accessibility attributes (role, aria-label)
 * - Verify animation classes are applied
 * - Test ref forwarding for DOM access
 */

import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import { Spinner } from "./spinner";

describe("Spinner", () => {
  describe("Rendering", () => {
    it("renders with default size", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("renders all size options", () => {
      const sizes = ["sm", "md", "lg"] as const;

      sizes.forEach((size) => {
        const { container } = render(<Spinner size={size} />);
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
      });
    });

    it("renders as an SVG element", () => {
      const { container } = render(<Spinner />);
      const svg = container.firstChild as SVGElement;
      expect(svg.tagName).toBe("svg");
    });

    it("applies custom className", () => {
      const { container } = render(<Spinner className="custom-class" />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveClass("custom-class");
    });

    it("includes circle and path elements", () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector("circle");
      const path = container.querySelector("path");

      expect(circle).toBeInTheDocument();
      expect(path).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has role='status' attribute", () => {
      const { container } = render(<Spinner />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveAttribute("role", "status");
    });

    it("has aria-label for screen readers", () => {
      render(<Spinner />);
      const spinner = screen.getByLabelText("Loading");
      expect(spinner).toBeInTheDocument();
    });

    it("supports custom aria-label", () => {
      render(<Spinner aria-label="Processing..." />);
      const spinner = screen.getByLabelText("Processing...");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Size Variants", () => {
    it("applies small size classes", () => {
      const { container } = render(<Spinner size="sm" />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveClass("size-4");
    });

    it("applies medium size classes", () => {
      const { container } = render(<Spinner size="md" />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveClass("size-6");
    });

    it("applies large size classes", () => {
      const { container } = render(<Spinner size="lg" />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveClass("size-8");
    });

    it("applies animation class to all sizes", () => {
      const sizes = ["sm", "md", "lg"] as const;

      sizes.forEach((size) => {
        const { container } = render(<Spinner size={size} />);
        const svg = container.firstChild as SVGElement;
        expect(svg).toHaveClass("animate-spin");
      });
    });
  });

  describe("SVG Attributes", () => {
    it("supports id attribute", () => {
      const { container } = render(<Spinner id="spinner-id" />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveAttribute("id", "spinner-id");
    });

    it("supports data attributes", () => {
      render(<Spinner data-testid="custom-spinner" />);
      expect(screen.getByTestId("custom-spinner")).toBeInTheDocument();
    });

    it("has correct viewBox", () => {
      const { container } = render(<Spinner />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("has fill='none' for SVG", () => {
      const { container } = render(<Spinner />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("supports title attribute", () => {
      const { container } = render(<Spinner title="Loading spinner" />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toHaveAttribute("title", "Loading spinner");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to SVG element", () => {
      const ref = createRef<SVGSVGElement>();
      render(<Spinner ref={ref} />);

      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current?.tagName).toBe("svg");
    });

    it("allows DOM manipulation via ref", () => {
      const ref = createRef<SVGSVGElement>();
      render(<Spinner ref={ref} />);

      // Should be able to access SVG properties
      expect(ref.current?.classList.contains("animate-spin")).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined size gracefully", () => {
      const { container } = render(<Spinner size={undefined} />);
      const svg = container.firstChild as SVGElement;
      expect(svg).toBeInTheDocument();
      // Should fall back to default 'md' size
      expect(svg).toHaveClass("size-6");
    });

    it("merges custom className with size classes", () => {
      const { container } = render(
        <Spinner className="text-error-main" size="lg" />,
      );
      const svg = container.firstChild as SVGElement;

      // Should have both size and custom classes
      expect(svg).toHaveClass("size-8");
      expect(svg).toHaveClass("text-error-main");
    });

    it("preserves animation class when custom className is added", () => {
      const { container } = render(<Spinner className="custom-spinner" />);
      const svg = container.firstChild as SVGElement;

      expect(svg).toHaveClass("animate-spin");
      expect(svg).toHaveClass("custom-spinner");
    });
  });

  describe("Color Customization", () => {
    it("uses currentColor for stroke inheritance", () => {
      const { container } = render(<Spinner className="text-primary-500" />);
      const circle = container.querySelector("circle");
      const path = container.querySelector("path");

      // Circle uses currentColor for stroke
      expect(circle).toHaveAttribute("stroke", "currentColor");
      // Path uses currentColor for fill
      expect(path).toHaveAttribute("fill", "currentColor");
    });
  });

  describe("Display Name", () => {
    it("has correct displayName for debugging", () => {
      expect(Spinner.displayName).toBe("Spinner");
    });
  });
});

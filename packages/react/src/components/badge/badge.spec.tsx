/**
 * Badge Component Tests
 *
 * Test coverage:
 * - Rendering variants
 * - Custom className
 * - Children content
 * - HTML span attributes
 *
 * Educational Notes:
 * - Badges are simpler than buttons (no interactions to test)
 * - Focus on visual variants and rendering
 * - Test semantic HTML (span element)
 */

import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import { Badge } from "./badge";

describe("Badge", () => {
  describe("Rendering", () => {
    it("renders with default variant", () => {
      render(<Badge>Default</Badge>);
      expect(screen.getByText("Default")).toBeInTheDocument();
    });

    it("renders all variant options", () => {
      const variants = [
        "default",
        "secondary",
        "destructive",
        "outline",
      ] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <Badge variant={variant}>{variant}</Badge>,
        );
        expect(container.firstChild).toBeInTheDocument();
      });
    });

    it("renders as a span element", () => {
      const { container } = render(<Badge>Span Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.tagName).toBe("SPAN");
    });

    it("applies custom className", () => {
      const { container } = render(
        <Badge className="custom-class">Badge</Badge>,
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("renders children correctly", () => {
      render(<Badge>Test Content</Badge>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with complex children", () => {
      render(
        <Badge>
          <span>Icon</span>
          <span>Text</span>
        </Badge>,
      );

      expect(screen.getByText("Icon")).toBeInTheDocument();
      expect(screen.getByText("Text")).toBeInTheDocument();
    });
  });

  describe("Variant Styles", () => {
    it("applies default variant classes", () => {
      const { container } = render(<Badge variant="default">Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-primary-500");
      expect(badge).toHaveClass("text-white");
    });

    it("applies secondary variant classes", () => {
      const { container } = render(
        <Badge variant="secondary">Secondary</Badge>,
      );
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-neutral-200");
      expect(badge).toHaveClass("text-neutral-900");
    });

    it("applies destructive variant classes", () => {
      const { container } = render(<Badge variant="destructive">Error</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("bg-error-main");
      expect(badge).toHaveClass("text-white");
    });

    it("applies outline variant classes", () => {
      const { container } = render(<Badge variant="outline">Outline</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass("border");
      expect(badge).toHaveClass("border-neutral-300");
    });

    it("applies base classes to all variants", () => {
      const { container } = render(<Badge>Badge</Badge>);
      const badge = container.firstChild as HTMLElement;

      // Check common base classes
      expect(badge).toHaveClass("inline-flex");
      expect(badge).toHaveClass("items-center");
      expect(badge).toHaveClass("rounded-full");
    });
  });

  describe("HTML Span Attributes", () => {
    it("supports id attribute", () => {
      const { container } = render(<Badge id="badge-id">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute("id", "badge-id");
    });

    it("supports data attributes", () => {
      render(<Badge data-testid="custom-badge">Badge</Badge>);
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Badge aria-label="Status indicator">3</Badge>);
      const badge = screen.getByLabelText("Status indicator");
      expect(badge).toBeInTheDocument();
      expect(badge.textContent).toBe("3");
    });

    it("supports title attribute", () => {
      const { container } = render(<Badge title="Tooltip text">Badge</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveAttribute("title", "Tooltip text");
    });
  });

  describe("Edge Cases", () => {
    it("renders with no children", () => {
      const { container } = render(<Badge />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("renders with numeric children", () => {
      render(<Badge>{42}</Badge>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("handles undefined variant gracefully", () => {
      const { container } = render(<Badge variant={undefined}>Badge</Badge>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("merges custom className with variant classes", () => {
      const { container } = render(
        <Badge className="custom-spacing" variant="secondary">
          Badge
        </Badge>,
      );
      const badge = container.firstChild as HTMLElement;

      // Should have both variant and custom classes
      expect(badge).toHaveClass("bg-neutral-200");
      expect(badge).toHaveClass("custom-spacing");
    });
  });
});

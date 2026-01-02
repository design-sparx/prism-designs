/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- Test files use any for mocking */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./separator";

describe("Separator", () => {
  describe("Rendering", () => {
    it("should render a separator", () => {
      const { container } = render(<Separator data-testid="separator" />);
      const separator = container.querySelector('[data-testid="separator"]');
      expect(separator).toBeInTheDocument();
    });

    it("should render as div by default (decorative)", () => {
      const { container } = render(<Separator data-testid="separator" />);
      const separator = container.querySelector('[data-testid="separator"]');
      expect(separator?.tagName).toBe("DIV");
    });

    it("should render as hr when not decorative", () => {
      const { container } = render(
        <Separator data-testid="separator" decorative={false} />,
      );
      const separator = container.querySelector('[data-testid="separator"]');
      expect(separator?.tagName).toBe("HR");
    });
  });

  describe("Orientation", () => {
    it("should render horizontal by default", () => {
      render(<Separator data-testid="separator" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveClass("h-[1px]", "w-full");
    });

    it("should render vertical when orientation is vertical", () => {
      render(<Separator data-testid="separator" orientation="vertical" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveClass("h-full", "w-[1px]");
    });

    it("should apply correct aria-orientation for horizontal", () => {
      render(<Separator data-testid="separator" orientation="horizontal" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("should apply correct aria-orientation for vertical", () => {
      render(<Separator data-testid="separator" orientation="vertical" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-orientation", "vertical");
    });
  });

  describe("Accessibility", () => {
    it("should have role separator when decorative", () => {
      render(<Separator data-testid="separator" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("role", "separator");
    });

    it("should be hidden from screen readers when decorative", () => {
      render(<Separator data-testid="separator" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("should not have role separator when not decorative", () => {
      render(<Separator data-testid="separator" decorative={false} />);
      const separator = screen.getByTestId("separator");
      expect(separator).not.toHaveAttribute("role");
    });

    it("should not be hidden from screen readers when not decorative", () => {
      render(<Separator data-testid="separator" decorative={false} />);
      const separator = screen.getByTestId("separator");
      expect(separator).not.toHaveAttribute("aria-hidden");
    });
  });

  describe("Custom Props", () => {
    it("should accept custom className", () => {
      render(<Separator className="custom-class" data-testid="separator" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveClass("custom-class");
    });

    it("should merge custom className with default classes", () => {
      render(<Separator className="my-4" data-testid="separator" />);
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveClass("my-4", "shrink-0", "bg-border");
    });

    it("should forward other HTML attributes", () => {
      render(<Separator data-custom="value" id="custom-id" />);
      const separator = document.getElementById("custom-id");
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the separator element", () => {
      const ref = { current: null };
      render(<Separator ref={ref as any} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });
});

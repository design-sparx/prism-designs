/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- Test files use any for mocking */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  describe("Rendering", () => {
    it("should render skeleton", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton.tagName).toBe("DIV");
    });

    it("should have base styling classes", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
    });
  });

  describe("Accessibility", () => {
    it("should have role status", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveAttribute("role", "status");
    });

    it("should have aria-live polite", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveAttribute("aria-live", "polite");
    });

    it("should have aria-busy true", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveAttribute("aria-busy", "true");
    });

    it("should have screen reader text", () => {
      render(<Skeleton />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should hide screen reader text visually", () => {
      render(<Skeleton />);
      const srText = screen.getByText("Loading...");
      expect(srText).toHaveClass("sr-only");
    });
  });

  describe("Custom Props", () => {
    it("should accept custom className", () => {
      render(<Skeleton className="h-4 w-[250px]" data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("h-4", "w-[250px]");
    });

    it("should merge custom className with base classes", () => {
      render(
        <Skeleton className="h-12 w-12 rounded-full" data-testid="skeleton" />,
      );
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass(
        "h-12",
        "w-12",
        "rounded-full",
        "animate-pulse",
        "bg-muted",
      );
    });

    it("should forward other HTML attributes", () => {
      render(<Skeleton data-custom="value" id="custom-skeleton" />);
      const skeleton = document.getElementById("custom-skeleton");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Ref Forwarding", () => {
    it("should forward ref to the skeleton element", () => {
      const ref = { current: null };
      render(<Skeleton ref={ref as any} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Common Use Cases", () => {
    it("should work as circular skeleton (avatar)", () => {
      render(
        <Skeleton className="h-12 w-12 rounded-full" data-testid="skeleton" />,
      );
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("h-12", "w-12", "rounded-full");
    });

    it("should work as rectangular skeleton (card)", () => {
      render(
        <Skeleton
          className="h-[125px] w-[250px] rounded-xl"
          data-testid="skeleton"
        />,
      );
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("h-[125px]", "w-[250px]", "rounded-xl");
    });

    it("should work as line skeleton (text)", () => {
      render(<Skeleton className="h-4 w-[200px]" data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("h-4", "w-[200px]");
    });
  });
});

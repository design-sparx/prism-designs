/**
 * Progress Component Tests
 *
 * Test coverage:
 * - Rendering and basic functionality
 * - Accessibility (role and aria labels)
 * - Ref forwarding
 * - Custom className
 *
 * Educational Notes:
 * - Radix UI progress uses role="progressbar"
 * - Progress is a presentational component
 * - The indicator's transform style changes based on value
 */

import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import { Progress } from "./progress";

describe("Progress", () => {
  describe("Rendering", () => {
    it("renders with default props", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });

    it("renders with value prop", () => {
      const { container } = render(<Progress value={75} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
      // Verify it has rendered
      expect(container.firstChild).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Progress className="custom-progress" value={50} />,
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveClass("custom-progress");
    });

    it("renders with different values", () => {
      const values = [0, 25, 50, 75, 100];
      values.forEach((value) => {
        render(<Progress value={value} />);
        const progressbar = screen.getAllByRole("progressbar");
        // Each progress bar should render
        expect(progressbar.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Accessibility", () => {
    it("has correct role", () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      render(<Progress aria-label="Upload progress" value={50} />);
      const progressbar = screen.getByRole("progressbar", {
        name: /upload progress/i,
      });
      expect(progressbar).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      render(
        <div>
          <span id="progress-label">File upload</span>
          <Progress aria-labelledby="progress-label" value={50} />
        </div>,
      );
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toHaveAttribute("aria-labelledby", "progress-label");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to progress root element", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("role", "progressbar");
    });

    it("ref provides access to DOM element", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Progress ref={ref} value={50} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current?.getAttribute("role")).toBe("progressbar");
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined value gracefully", () => {
      const { container } = render(<Progress />);
      const progressbar = screen.getByRole("progressbar");
      // Without value, it's in indeterminate state
      expect(progressbar).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles null value gracefully", () => {
      // @ts-expect-error Testing null value
      const { container } = render(<Progress value={null} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles zero value", () => {
      render(<Progress value={0} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });

    it("handles 100% value", () => {
      render(<Progress value={100} />);
      const progressbar = screen.getByRole("progressbar");
      expect(progressbar).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies base classes to root", () => {
      const { container } = render(<Progress value={50} />);
      const root = container.firstChild as HTMLElement;

      expect(root).toHaveClass("relative");
      expect(root).toHaveClass("h-2");
      expect(root).toHaveClass("w-full");
      expect(root).toHaveClass("overflow-hidden");
      expect(root).toHaveClass("rounded-full");
      expect(root).toHaveClass("bg-neutral-200");
    });

    it("merges custom className with base classes", () => {
      const { container } = render(
        <Progress className="custom-height" value={50} />,
      );
      const root = container.firstChild as HTMLElement;

      expect(root).toHaveClass("custom-height");
      expect(root).toHaveClass("w-full");
    });

    it("applies width class correctly", () => {
      const { container } = render(
        <Progress className="w-[600px]" value={50} />,
      );
      const root = container.firstChild as HTMLElement;

      expect(root).toHaveClass("w-[600px]");
    });
  });

  describe("Display Name", () => {
    it("has correct displayName for debugging", () => {
      expect(Progress.displayName).toBe("Progress");
    });
  });
});

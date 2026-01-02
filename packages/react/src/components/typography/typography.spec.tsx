/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- Test files use any for mocking */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Typography } from "./typography";

describe("Typography", () => {
  describe("Rendering", () => {
    it("should render typography component", () => {
      render(<Typography data-testid="typography">Content</Typography>);
      const typography = screen.getByTestId("typography");
      expect(typography).toBeInTheDocument();
    });

    it("should render as p by default", () => {
      render(<Typography data-testid="typography">Content</Typography>);
      const typography = screen.getByTestId("typography");
      expect(typography.tagName).toBe("P");
    });

    it("should accept custom className", () => {
      render(
        <Typography className="custom-class" data-testid="typography">
          Content
        </Typography>,
      );
      const typography = screen.getByTestId("typography");
      expect(typography).toHaveClass("custom-class");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(<Typography ref={ref as any}>Content</Typography>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe("Heading Variants", () => {
    it("should render h1 variant with correct element and styles", () => {
      render(<Typography variant="h1">Heading 1</Typography>);
      const heading = screen.getByText("Heading 1");
      expect(heading.tagName).toBe("H1");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-4xl",
        "font-extrabold",
        "tracking-tight",
      );
    });

    it("should render h2 variant with correct element and styles", () => {
      render(<Typography variant="h2">Heading 2</Typography>);
      const heading = screen.getByText("Heading 2");
      expect(heading.tagName).toBe("H2");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "border-b",
        "pb-2",
        "text-3xl",
        "font-semibold",
      );
    });

    it("should render h3 variant with correct element and styles", () => {
      render(<Typography variant="h3">Heading 3</Typography>);
      const heading = screen.getByText("Heading 3");
      expect(heading.tagName).toBe("H3");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-2xl",
        "font-semibold",
        "tracking-tight",
      );
    });

    it("should render h4 variant with correct element and styles", () => {
      render(<Typography variant="h4">Heading 4</Typography>);
      const heading = screen.getByText("Heading 4");
      expect(heading.tagName).toBe("H4");
      expect(heading).toHaveClass(
        "scroll-m-20",
        "text-xl",
        "font-semibold",
        "tracking-tight",
      );
    });
  });

  describe("Text Variants", () => {
    it("should render paragraph variant", () => {
      render(<Typography variant="p">Paragraph text</Typography>);
      const text = screen.getByText("Paragraph text");
      expect(text.tagName).toBe("P");
      expect(text).toHaveClass("leading-7");
    });

    it("should render lead variant", () => {
      render(<Typography variant="lead">Lead text</Typography>);
      const text = screen.getByText("Lead text");
      expect(text.tagName).toBe("P");
      expect(text).toHaveClass("text-xl", "text-muted-foreground");
    });

    it("should render large variant", () => {
      render(<Typography variant="large">Large text</Typography>);
      const text = screen.getByText("Large text");
      expect(text.tagName).toBe("DIV");
      expect(text).toHaveClass("text-lg", "font-semibold");
    });

    it("should render small variant", () => {
      render(<Typography variant="small">Small text</Typography>);
      const text = screen.getByText("Small text");
      expect(text.tagName).toBe("SMALL");
      expect(text).toHaveClass("text-sm", "font-medium", "leading-none");
    });

    it("should render muted variant", () => {
      render(<Typography variant="muted">Muted text</Typography>);
      const text = screen.getByText("Muted text");
      expect(text.tagName).toBe("P");
      expect(text).toHaveClass("text-sm", "text-muted-foreground");
    });
  });

  describe("Special Variants", () => {
    it("should render blockquote variant", () => {
      render(<Typography variant="blockquote">Quote text</Typography>);
      const quote = screen.getByText("Quote text");
      expect(quote.tagName).toBe("BLOCKQUOTE");
      expect(quote).toHaveClass("mt-6", "border-l-2", "pl-6", "italic");
    });

    it("should render list variant", () => {
      render(
        <Typography variant="list">
          <li>Item 1</li>
          <li>Item 2</li>
        </Typography>,
      );
      const list = screen.getByText("Item 1").parentElement;
      expect(list?.tagName).toBe("UL");
      expect(list).toHaveClass("my-6", "ml-6", "list-disc");
    });

    it("should render inlineCode variant", () => {
      render(<Typography variant="inlineCode">const x = 1</Typography>);
      const code = screen.getByText("const x = 1");
      expect(code.tagName).toBe("CODE");
      expect(code).toHaveClass(
        "relative",
        "rounded",
        "bg-muted",
        "font-mono",
        "text-sm",
        "font-semibold",
      );
    });
  });

  describe("Custom Element Override", () => {
    it("should override element with as prop", () => {
      render(
        <Typography as="p" variant="h1">
          Styled as h1, semantic p
        </Typography>,
      );
      const element = screen.getByText("Styled as h1, semantic p");
      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text-4xl", "font-extrabold"); // h1 styles
    });

    it("should allow div as custom element", () => {
      render(
        <Typography as="div" variant="h2">
          Heading styled div
        </Typography>,
      );
      const element = screen.getByText("Heading styled div");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("text-3xl", "font-semibold");
    });

    it("should allow span as custom element", () => {
      render(
        <Typography as="span" variant="large">
          Inline large text
        </Typography>,
      );
      const element = screen.getByText("Inline large text");
      expect(element.tagName).toBe("SPAN");
      expect(element).toHaveClass("text-lg", "font-semibold");
    });
  });

  describe("Props Forwarding", () => {
    it("should forward HTML attributes", () => {
      render(
        <Typography data-custom="value" id="custom-id">
          Content
        </Typography>,
      );
      const element = document.getElementById("custom-id");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-custom", "value");
    });

    it("should merge custom className with variant styles", () => {
      render(
        <Typography className="text-center" data-testid="heading" variant="h1">
          Centered Heading
        </Typography>,
      );
      const heading = screen.getByTestId("heading");
      expect(heading).toHaveClass("text-center", "text-4xl", "font-extrabold");
    });
  });
});

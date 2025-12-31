/**
 * Card Component Tests
 *
 * Test coverage:
 * - Rendering all card subcomponents
 * - Composition (Card with Header, Content, Footer)
 * - Custom className support
 * - Ref forwarding
 * - HTML attributes
 *
 * Educational Notes:
 * - Test composition patterns (how components work together)
 * - Verify semantic HTML structure
 * - Keep tests simple and focused
 */

import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  describe("Card Container", () => {
    it("renders correctly", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(<Card className="custom-class">Card</Card>);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("forwards ref to div element", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card</Card>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("renders as div element", () => {
      const { container } = render(<Card>Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.tagName).toBe("DIV");
    });
  });

  describe("CardHeader", () => {
    it("renders correctly", () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <CardHeader className="custom-header">Header</CardHeader>,
      );
      expect(container.firstChild).toHaveClass("custom-header");
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardHeader ref={ref}>Header</CardHeader>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("CardTitle", () => {
    it("renders correctly", () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText("Card Title")).toBeInTheDocument();
    });

    it("renders as h3 element", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.firstChild as HTMLElement;
      expect(title.tagName).toBe("H3");
    });

    it("applies custom className", () => {
      const { container } = render(
        <CardTitle className="custom-title">Title</CardTitle>,
      );
      expect(container.firstChild).toHaveClass("custom-title");
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<CardTitle ref={ref}>Title</CardTitle>);

      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe("CardDescription", () => {
    it("renders correctly", () => {
      render(<CardDescription>Description text</CardDescription>);
      expect(screen.getByText("Description text")).toBeInTheDocument();
    });

    it("renders as p element", () => {
      const { container } = render(
        <CardDescription>Description</CardDescription>,
      );
      const desc = container.firstChild as HTMLElement;
      expect(desc.tagName).toBe("P");
    });

    it("applies custom className", () => {
      const { container } = render(
        <CardDescription className="custom-desc">Desc</CardDescription>,
      );
      expect(container.firstChild).toHaveClass("custom-desc");
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref}>Description</CardDescription>);

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe("CardContent", () => {
    it("renders correctly", () => {
      render(<CardContent>Content area</CardContent>);
      expect(screen.getByText("Content area")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <CardContent className="custom-content">Content</CardContent>,
      );
      expect(container.firstChild).toHaveClass("custom-content");
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardContent ref={ref}>Content</CardContent>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("CardFooter", () => {
    it("renders correctly", () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <CardFooter className="custom-footer">Footer</CardFooter>,
      );
      expect(container.firstChild).toHaveClass("custom-footer");
    });

    it("forwards ref", () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardFooter ref={ref}>Footer</CardFooter>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Composition", () => {
    it("renders complete card with all sections", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>,
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
      expect(screen.getByText("Test Footer")).toBeInTheDocument();
    });

    it("works without header", () => {
      render(
        <Card>
          <CardContent>Content only</CardContent>
        </Card>,
      );

      expect(screen.getByText("Content only")).toBeInTheDocument();
    });

    it("works without footer", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>,
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("supports complex children in content", () => {
      render(
        <Card>
          <CardContent>
            <div>
              <p>Paragraph 1</p>
              <p>Paragraph 2</p>
            </div>
          </CardContent>
        </Card>,
      );

      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

  describe("HTML Attributes", () => {
    it("supports data attributes on Card", () => {
      render(<Card data-testid="test-card">Card</Card>);
      expect(screen.getByTestId("test-card")).toBeInTheDocument();
    });

    it("supports aria attributes on CardTitle", () => {
      render(<CardTitle aria-level={2}>Title</CardTitle>);
      const title = screen.getByText("Title");
      expect(title).toHaveAttribute("aria-level", "2");
    });

    it("supports id attribute", () => {
      const { container } = render(<Card id="my-card">Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute("id", "my-card");
    });
  });
});

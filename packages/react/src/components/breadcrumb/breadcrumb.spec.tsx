import { describe, expect, it } from "vitest";
import { render, screen } from "../../test/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb";

describe("Breadcrumb", () => {
  describe("Breadcrumb (root)", () => {
    it("renders a nav element", () => {
      render(<Breadcrumb data-testid="breadcrumb" />);
      const breadcrumb = screen.getByTestId("breadcrumb");
      expect(breadcrumb.tagName).toBe("NAV");
    });

    it("has default aria-label", () => {
      render(<Breadcrumb data-testid="breadcrumb" />);
      const breadcrumb = screen.getByTestId("breadcrumb");
      expect(breadcrumb).toHaveAttribute("aria-label", "breadcrumb");
    });

    it("accepts custom aria-label", () => {
      render(
        <Breadcrumb aria-label="Site navigation" data-testid="breadcrumb" />,
      );
      const breadcrumb = screen.getByTestId("breadcrumb");
      expect(breadcrumb).toHaveAttribute("aria-label", "Site navigation");
    });
  });

  describe("BreadcrumbList", () => {
    it("renders an ordered list", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list" />
        </Breadcrumb>,
      );
      const list = screen.getByTestId("list");
      expect(list.tagName).toBe("OL");
    });

    it("applies default styling classes", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list" />
        </Breadcrumb>,
      );
      const list = screen.getByTestId("list");
      expect(list).toHaveClass("flex", "flex-wrap", "items-center");
    });
  });

  describe("BreadcrumbItem", () => {
    it("renders a list item", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem data-testid="item">Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const item = screen.getByTestId("item");
      expect(item.tagName).toBe("LI");
    });

    it("renders children correctly", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  describe("BreadcrumbLink", () => {
    it("renders an anchor element", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink data-testid="link" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByTestId("link");
      expect(link.tagName).toBe("A");
    });

    it("accepts href attribute", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const link = screen.getByRole("link", { name: "About" });
      expect(link).toHaveAttribute("href", "/about");
    });
  });

  describe("BreadcrumbPage", () => {
    it("renders a span element", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByTestId("page");
      expect(page.tagName).toBe("SPAN");
    });

    it("has aria-current attribute", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByTestId("page");
      expect(page).toHaveAttribute("aria-current", "page");
    });

    it("has role link for accessibility", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const page = screen.getByRole("link", { name: "Current" });
      expect(page).toBeInTheDocument();
    });
  });

  describe("BreadcrumbSeparator", () => {
    it("renders a list item", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator.tagName).toBe("LI");
    });

    it("is hidden from screen readers", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("aria-hidden", "true");
    });

    it("has presentation role", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const separator = screen.getByTestId("separator");
      expect(separator).toHaveAttribute("role", "presentation");
    });

    it("renders custom separator", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("/")).toBeInTheDocument();
    });
  });

  describe("BreadcrumbEllipsis", () => {
    it("renders a span element", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const ellipsis = screen.getByTestId("ellipsis");
      expect(ellipsis.tagName).toBe("SPAN");
    });

    it("is hidden from screen readers", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      const ellipsis = screen.getByTestId("ellipsis");
      expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    });

    it("has sr-only text", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );
      expect(screen.getByText("More")).toHaveClass("sr-only");
    });
  });

  describe("Complete breadcrumb", () => {
    it("renders full breadcrumb navigation", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>,
      );

      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Docs")).toBeInTheDocument();
      expect(screen.getByText("Components")).toBeInTheDocument();
    });
  });
});

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- Test files use any for mocking */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  describe("Alert Container", () => {
    it("should render alert", () => {
      render(<Alert data-testid="alert">Alert content</Alert>);
      const alert = screen.getByTestId("alert");
      expect(alert).toBeInTheDocument();
    });

    it("should have role alert", () => {
      render(<Alert data-testid="alert">Alert content</Alert>);
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveAttribute("role", "alert");
    });

    it("should have base styling classes", () => {
      render(<Alert data-testid="alert">Alert content</Alert>);
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass(
        "relative",
        "w-full",
        "rounded-lg",
        "border",
        "p-4",
      );
    });

    it("should accept custom className", () => {
      render(
        <Alert className="custom-class" data-testid="alert">
          Alert content
        </Alert>,
      );
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass("custom-class");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(<Alert ref={ref as any}>Alert content</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Alert Variants", () => {
    it("should render default variant", () => {
      render(<Alert data-testid="alert">Alert content</Alert>);
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass(
        "bg-background",
        "text-foreground",
        "border-border",
      );
    });

    it("should render destructive variant", () => {
      render(
        <Alert data-testid="alert" variant="destructive">
          Alert content
        </Alert>,
      );
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass("text-destructive");
    });

    it("should render success variant", () => {
      render(
        <Alert data-testid="alert" variant="success">
          Alert content
        </Alert>,
      );
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass("text-green-900");
    });

    it("should render info variant", () => {
      render(
        <Alert data-testid="alert" variant="info">
          Alert content
        </Alert>,
      );
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass("text-blue-900");
    });
  });

  describe("AlertTitle", () => {
    it("should render alert title", () => {
      render(
        <Alert>
          <AlertTitle>Important Notice</AlertTitle>
        </Alert>,
      );
      expect(screen.getByText("Important Notice")).toBeInTheDocument();
    });

    it("should render as h5 element", () => {
      render(
        <Alert>
          <AlertTitle data-testid="title">Important Notice</AlertTitle>
        </Alert>,
      );
      const title = screen.getByTestId("title");
      expect(title.tagName).toBe("H5");
    });

    it("should have title styling classes", () => {
      render(
        <Alert>
          <AlertTitle data-testid="title">Important Notice</AlertTitle>
        </Alert>,
      );
      const title = screen.getByTestId("title");
      expect(title).toHaveClass(
        "mb-1",
        "font-medium",
        "leading-none",
        "tracking-tight",
      );
    });

    it("should accept custom className", () => {
      render(
        <Alert>
          <AlertTitle className="custom-title" data-testid="title">
            Important Notice
          </AlertTitle>
        </Alert>,
      );
      const title = screen.getByTestId("title");
      expect(title).toHaveClass("custom-title");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(
        <Alert>
          <AlertTitle ref={ref as any}>Title</AlertTitle>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe("AlertDescription", () => {
    it("should render alert description", () => {
      render(
        <Alert>
          <AlertDescription>This is a description</AlertDescription>
        </Alert>,
      );
      expect(screen.getByText("This is a description")).toBeInTheDocument();
    });

    it("should render as div element", () => {
      render(
        <Alert>
          <AlertDescription data-testid="description">
            This is a description
          </AlertDescription>
        </Alert>,
      );
      const description = screen.getByTestId("description");
      expect(description.tagName).toBe("DIV");
    });

    it("should have description styling classes", () => {
      render(
        <Alert>
          <AlertDescription data-testid="description">
            This is a description
          </AlertDescription>
        </Alert>,
      );
      const description = screen.getByTestId("description");
      expect(description).toHaveClass("text-sm");
    });

    it("should accept custom className", () => {
      render(
        <Alert>
          <AlertDescription className="custom-desc" data-testid="description">
            This is a description
          </AlertDescription>
        </Alert>,
      );
      const description = screen.getByTestId("description");
      expect(description).toHaveClass("custom-desc");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(
        <Alert>
          <AlertDescription ref={ref as any}>Description</AlertDescription>
        </Alert>,
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Alert Composition", () => {
    it("should render complete alert with title and description", () => {
      render(
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
        </Alert>,
      );
      expect(screen.getByText("Success")).toBeInTheDocument();
      expect(
        screen.getByText("Your changes have been saved."),
      ).toBeInTheDocument();
    });

    it("should work with different variants", () => {
      render(
        <Alert data-testid="alert" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>,
      );
      const alert = screen.getByTestId("alert");
      expect(alert).toHaveClass("text-destructive");
      expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("should render with custom content", () => {
      render(
        <Alert>
          <AlertTitle>Notice</AlertTitle>
          <AlertDescription>
            <p>First paragraph</p>
            <p>Second paragraph</p>
          </AlertDescription>
        </Alert>,
      );
      expect(screen.getByText("First paragraph")).toBeInTheDocument();
      expect(screen.getByText("Second paragraph")).toBeInTheDocument();
    });
  });
});

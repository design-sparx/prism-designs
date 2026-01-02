/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any -- Test files use any for mocking */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  describe("Avatar Container", () => {
    it("should render avatar container", () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("should render as span element", () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId("avatar");
      expect(avatar.tagName).toBe("SPAN");
    });

    it("should have base classes", () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass(
        "relative",
        "flex",
        "shrink-0",
        "overflow-hidden",
        "rounded-full",
      );
    });

    it("should accept custom className", () => {
      render(
        <Avatar className="custom-class" data-testid="avatar">
          Content
        </Avatar>,
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("custom-class");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(<Avatar ref={ref as any}>Content</Avatar>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("Avatar Sizes", () => {
    it("should render medium size by default", () => {
      render(<Avatar data-testid="avatar">Content</Avatar>);
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-10", "w-10", "text-sm");
    });

    it("should render small size", () => {
      render(
        <Avatar data-testid="avatar" size="sm">
          Content
        </Avatar>,
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-8", "w-8", "text-xs");
    });

    it("should render large size", () => {
      render(
        <Avatar data-testid="avatar" size="lg">
          Content
        </Avatar>,
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-12", "w-12", "text-base");
    });

    it("should render extra large size", () => {
      render(
        <Avatar data-testid="avatar" size="xl">
          Content
        </Avatar>,
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-16", "w-16", "text-lg");
    });
  });

  describe("AvatarImage", () => {
    it("should render image element", () => {
      render(
        <Avatar>
          <AvatarImage alt="Test User" src="/test.jpg" />
        </Avatar>,
      );
      const image = screen.getByRole("img", { name: "Test User" });
      expect(image).toBeInTheDocument();
    });

    it("should have correct src attribute", () => {
      render(
        <Avatar>
          <AvatarImage alt="User" src="/avatar.jpg" />
        </Avatar>,
      );
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("src", "/avatar.jpg");
    });

    it("should have correct alt attribute", () => {
      render(
        <Avatar>
          <AvatarImage alt="John Doe" src="/avatar.jpg" />
        </Avatar>,
      );
      const image = screen.getByRole("img");
      expect(image).toHaveAttribute("alt", "John Doe");
    });

    it("should have image styling classes", () => {
      render(
        <Avatar>
          <AvatarImage alt="User" data-testid="avatar-image" src="/test.jpg" />
        </Avatar>,
      );
      const image = screen.getByTestId("avatar-image");
      expect(image).toHaveClass(
        "aspect-square",
        "h-full",
        "w-full",
        "object-cover",
      );
    });

    it("should accept custom className", () => {
      render(
        <Avatar>
          <AvatarImage
            alt="User"
            className="custom-image"
            data-testid="avatar-image"
            src="/test.jpg"
          />
        </Avatar>,
      );
      const image = screen.getByTestId("avatar-image");
      expect(image).toHaveClass("custom-image");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(
        <Avatar>
          <AvatarImage alt="User" ref={ref as any} src="/test.jpg" />
        </Avatar>,
      );
      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe("AvatarFallback", () => {
    it("should render fallback content", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should render as span element", () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>,
      );
      const fallback = screen.getByTestId("fallback");
      expect(fallback.tagName).toBe("SPAN");
    });

    it("should have fallback styling classes", () => {
      render(
        <Avatar>
          <AvatarFallback data-testid="fallback">JD</AvatarFallback>
        </Avatar>,
      );
      const fallback = screen.getByTestId("fallback");
      expect(fallback).toHaveClass(
        "flex",
        "h-full",
        "w-full",
        "items-center",
        "justify-center",
        "rounded-full",
        "bg-muted",
        "font-medium",
        "text-muted-foreground",
      );
    });

    it("should accept custom className", () => {
      render(
        <Avatar>
          <AvatarFallback className="custom-fallback" data-testid="fallback">
            JD
          </AvatarFallback>
        </Avatar>,
      );
      const fallback = screen.getByTestId("fallback");
      expect(fallback).toHaveClass("custom-fallback");
    });

    it("should forward ref", () => {
      const ref = { current: null };
      render(
        <Avatar>
          <AvatarFallback ref={ref as any}>JD</AvatarFallback>
        </Avatar>,
      );
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("Avatar Composition", () => {
    it("should render image and fallback together", () => {
      render(
        <Avatar>
          <AvatarImage alt="User" src="/test.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("should work with different sizes", () => {
      render(
        <Avatar data-testid="avatar" size="lg">
          <AvatarImage alt="User" src="/test.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>,
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("h-12", "w-12");
    });
  });
});

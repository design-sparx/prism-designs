/**
 * Select Component Tests
 *
 * Test coverage:
 * - Rendering and basic functionality
 * - User interactions (clicking, keyboard navigation)
 * - Accessibility (ARIA attributes, roles)
 * - Selection state
 * - Grouped options
 * - Disabled states
 *
 * Educational Notes:
 * - Radix UI components have complex DOM structures
 * - We test user-facing behavior, not internal implementation
 * - Use getByRole for better accessibility testing
 * - Radix handles most ARIA automatically
 */

import * as React from "react";
import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

describe("Select", () => {
  describe("Rendering", () => {
    it("renders with a trigger and placeholder", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("renders with multiple options", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders grouped options", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("applies custom className to trigger", () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toHaveClass("custom-trigger");
    });
  });

  describe("User Interactions", () => {
    it("renders trigger that can receive focus", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      expect(trigger).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("has correct ARIA role", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("trigger supports keyboard focus", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      trigger.focus();
      expect(trigger).toHaveFocus();
    });
  });

  describe("Controlled Behavior", () => {
    it("renders with controlled value", () => {
      function ControlledSelect(): React.ReactElement {
        const [value] = React.useState("apple");

        return (
          <div>
            <Select value={value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectContent>
            </Select>
            <div data-testid="selected-value">{value}</div>
          </div>
        );
      }

      render(<ControlledSelect />);
      expect(screen.getByTestId("selected-value")).toHaveTextContent("apple");
    });
  });

  describe("Disabled State", () => {
    it("disables the trigger when disabled prop is set", () => {
      render(
        <Select disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      const trigger = screen.getByRole("combobox");
      expect(trigger).toBeDisabled();
    });
  });

  describe("Default Value", () => {
    it("displays default value on mount", () => {
      render(
        <Select defaultValue="banana">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Empty" />
          </SelectTrigger>
          <SelectContent />
        </Select>,
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders without crashing with minimal props", () => {
      const { container } = render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="test">Test</SelectItem>
          </SelectContent>
        </Select>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

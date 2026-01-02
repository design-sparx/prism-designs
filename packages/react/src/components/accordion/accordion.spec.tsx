import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

describe("Accordion", () => {
  it("renders accordion with items", () => {
    render(
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("expands and collapses items in single mode", async () => {
    const user = userEvent.setup();

    render(
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByText("Section 1");
    const trigger2 = screen.getByText("Section 2");

    // Initially, all content should be hidden
    // Verify no content is visible yet
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

    // Click first trigger to expand
    await user.click(trigger1);
    expect(screen.getByText("Content 1")).toBeVisible();

    // Click second trigger - should collapse first and expand second
    await user.click(trigger2);
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeVisible();

    // Click second trigger again to collapse (collapsible mode)
    await user.click(trigger2);
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("allows multiple items to be open in multiple mode", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByText("Section 1");
    const trigger2 = screen.getByText("Section 2");

    // Expand both items
    await user.click(trigger1);
    await user.click(trigger2);

    // Both should be visible simultaneously
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("supports controlled mode with defaultValue", () => {
    render(
      <Accordion collapsible defaultValue="item-1" type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // First item should be open by default
    expect(screen.getByText("Content 1")).toBeVisible();

    // Second item should not be visible
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("supports fully controlled mode", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Accordion
        collapsible
        onValueChange={handleValueChange}
        type="single"
        value="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger2 = screen.getByText("Section 2");
    await user.click(trigger2);

    expect(handleValueChange).toHaveBeenCalledWith("item-2");
  });

  it("applies custom className to items", () => {
    const { container } = render(
      <Accordion collapsible type="single">
        <AccordionItem className="custom-item" value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const item = container.querySelector(".custom-item");
    expect(item).toBeInTheDocument();
    expect(item).toHaveClass("custom-item");
  });

  it("applies custom className to trigger", () => {
    render(
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger className="custom-trigger">
            Section 1
          </AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText("Section 1");
    expect(trigger).toHaveClass("custom-trigger");
  });

  it("applies custom className to content", () => {
    render(
      <Accordion collapsible defaultValue="item-1" type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent className="custom-content">
            Content 1
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const content = screen.getByText("Content 1");
    expect(content).toHaveClass("custom-content");
  });

  it("forwards ref to accordion item", () => {
    const ref = vi.fn();

    render(
      <Accordion collapsible type="single">
        <AccordionItem ref={ref} value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref to accordion trigger", () => {
    const ref = vi.fn();

    render(
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger ref={ref}>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref to accordion content", () => {
    const ref = vi.fn();

    render(
      <Accordion collapsible defaultValue="item-1" type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent ref={ref}>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByText("Section 1");

    // Focus the trigger
    trigger1.focus();
    expect(trigger1).toHaveFocus();

    // Press Enter to expand
    await user.keyboard("{Enter}");
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("renders chevron icon that rotates when expanded", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Accordion collapsible type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText("Section 1");
    const chevron = container.querySelector("svg");

    expect(chevron).toBeInTheDocument();

    // Click to expand
    await user.click(trigger);

    // Chevron should have rotation class
    expect(chevron?.parentElement).toHaveAttribute("data-state", "open");
  });

  it("handles disabled state", () => {
    render(
      <Accordion collapsible type="single">
        <AccordionItem disabled value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText("Section 1");
    expect(trigger).toBeDisabled();
  });
});

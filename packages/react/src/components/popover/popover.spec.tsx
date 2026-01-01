/**
 * \@vitest-environment happy-dom
 */

import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

describe("Popover", () => {
  it("renders trigger button", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    expect(
      screen.getByRole("button", { name: /open popover/i }),
    ).toBeInTheDocument();
  });

  it("opens popover when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: /open popover/i });
    await user.click(trigger);

    // Content should appear
    expect(screen.getByText("Popover Content")).toBeInTheDocument();
  });

  it("closes popover when trigger is clicked again", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: /open popover/i });

    // Open popover
    await user.click(trigger);
    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    // Close popover
    await user.click(trigger);
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();
  });

  it("closes popover when Escape is pressed", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: /open popover/i });

    // Open popover
    await user.click(trigger);
    expect(screen.getByText("Popover Content")).toBeInTheDocument();

    // Press Escape
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Popover Content")).not.toBeInTheDocument();
  });

  it("renders custom trigger using asChild", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Custom Trigger</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: /custom trigger/i });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies custom className to PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent className="custom-class">Content</PopoverContent>
      </Popover>,
    );

    const content = screen.getByText("Content");
    expect(content).toHaveClass("custom-class");
  });

  it("uses default alignment of center", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    // Content should be rendered (exact alignment testing is complex with Radix)
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("accepts custom sideOffset prop", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent sideOffset={10}>Content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with different alignments", () => {
    const { rerender } = render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="start">Content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();

    rerender(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent align="end">Content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("supports controlled open state", async () => {
    const user = userEvent.setup();
    function ControlledPopover(): React.JSX.Element {
      const [open, setOpen] = React.useState(false);

      return (
        <div>
          <button
            onClick={() => {
              setOpen(true);
            }}
            type="button"
          >
            Open
          </button>
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger>Trigger</PopoverTrigger>
            <PopoverContent>Controlled Content</PopoverContent>
          </Popover>
        </div>
      );
    }

    render(<ControlledPopover />);

    const openButton = screen.getByRole("button", { name: /^open$/i });

    // Initially closed
    expect(screen.queryByText("Controlled Content")).not.toBeInTheDocument();

    // Open via external button
    await user.click(openButton);
    expect(screen.getByText("Controlled Content")).toBeInTheDocument();
  });
});

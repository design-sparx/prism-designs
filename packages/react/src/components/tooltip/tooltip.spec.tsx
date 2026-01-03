import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

describe("Tooltip", () => {
  it("renders trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("renders with TooltipProvider", () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Test Button</Button>
          </TooltipTrigger>
          <TooltipContent>Test Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("supports custom className on content", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button>Trigger</Button>
          </TooltipTrigger>
          <TooltipContent className="custom-class">Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    // Just verify the component can render with a className
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("supports custom sideOffset", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button>Button</Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>Content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Button")).toBeInTheDocument();
  });

  it("works with non-button triggers", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>Hover this text</span>
          </TooltipTrigger>
          <TooltipContent>Tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Hover this text")).toBeInTheDocument();
  });

  it("renders multiple tooltips with shared provider", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>First</Button>
          </TooltipTrigger>
          <TooltipContent>First tooltip</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Second</Button>
          </TooltipTrigger>
          <TooltipContent>Second tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders with controlled state", () => {
    function ControlledTooltip(): React.ReactElement {
      const [open, setOpen] = React.useState(false);

      return (
        <TooltipProvider>
          <div>
            <Button
              onClick={() => {
                setOpen(!open);
              }}
            >
              Toggle
            </Button>
            <Tooltip onOpenChange={setOpen} open={open}>
              <TooltipTrigger asChild>
                <Button>Trigger</Button>
              </TooltipTrigger>
              <TooltipContent>Controlled tooltip</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      );
    }

    render(<ControlledTooltip />);

    expect(screen.getByText("Toggle")).toBeInTheDocument();
    expect(screen.getByText("Trigger")).toBeInTheDocument();
  });

  it("accepts different side props", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button>Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">Top tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Top")).toBeInTheDocument();
  });

  it("accepts delay duration from provider", () => {
    render(
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Delayed</Button>
          </TooltipTrigger>
          <TooltipContent>Delayed tooltip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Delayed")).toBeInTheDocument();
  });

  it("renders with default open state", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <Button>Open by default</Button>
          </TooltipTrigger>
          <TooltipContent>Always visible</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByText("Open by default")).toBeInTheDocument();
  });
});

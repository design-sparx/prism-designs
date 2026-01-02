import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByText("Open Menu")).toBeInTheDocument();
  });

  it("opens menu when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Menu Item")).toBeInTheDocument();
  });

  it("closes menu when item is clicked", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));
    expect(screen.getByText("Menu Item")).toBeInTheDocument();

    await user.click(screen.getByText("Menu Item"));

    // Menu should close after clicking item
    expect(screen.queryByText("Menu Item")).not.toBeInTheDocument();
  });

  it("calls onSelect when menu item is clicked", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={handleSelect}>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));
    await user.click(screen.getByText("Menu Item"));

    expect(handleSelect).toHaveBeenCalled();
  });

  it("renders multiple menu items", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
          <DropdownMenuItem>Item 3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("renders separator between items", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="separator" />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("renders label for menu sections", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Section Label</DropdownMenuLabel>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Section Label")).toBeInTheDocument();
  });

  it("renders checkbox item", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={false}>
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Checkbox Item")).toBeInTheDocument();
  });

  it("toggles checkbox item", async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={handleCheckedChange}
          >
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));
    await user.click(screen.getByText("Checkbox Item"));

    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders radio group", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1">
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("changes radio selection", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            onValueChange={handleValueChange}
            value="option1"
          >
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));
    await user.click(screen.getByText("Option 2"));

    expect(handleValueChange).toHaveBeenCalledWith("option2");
  });

  it("renders shortcut hint", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("⌘S")).toBeInTheDocument();
  });

  it("renders grouped items", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Grouped Item 1</DropdownMenuItem>
            <DropdownMenuItem>Grouped Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("Grouped Item 1")).toBeInTheDocument();
    expect(screen.getByText("Grouped Item 2")).toBeInTheDocument();
  });

  it("renders submenu", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Submenu Item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    expect(screen.getByText("More Options")).toBeInTheDocument();
  });

  it("disables menu item", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled onSelect={handleSelect}>
            Disabled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    const disabledItem = screen.getByText("Disabled Item");
    expect(disabledItem).toBeInTheDocument();

    await user.click(disabledItem);

    // Disabled item should not trigger onSelect
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("applies inset prop to item", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    const insetItem = screen.getByText("Inset Item");
    expect(insetItem).toHaveClass("pl-8");
  });

  it("applies inset prop to label", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Inset Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByText("Open Menu"));

    const insetLabel = screen.getByText("Inset Label");
    expect(insetLabel).toHaveClass("pl-8");
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

describe("Tabs", () => {
  it("renders tabs with triggers and content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
  });

  it("shows default tab content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText("Content 1")).toBeVisible();

    // Content 2 should not be visible (has hidden attribute in inactive state)
    // We verify it exists in the DOM but is not accessible
    const allTabPanels = screen.getAllByRole("tabpanel", { hidden: true });
    const visiblePanels = allTabPanels.filter(
      (panel) => !panel.hasAttribute("hidden"),
    );
    expect(visiblePanels).toHaveLength(1); // Only one panel should be visible
  });

  it("switches content when clicking different tab", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    // After switching, Content 2 should be visible and Content 1 should be hidden
    expect(screen.getByText("Content 2")).toBeVisible();

    const allTabPanels = screen.getAllByRole("tabpanel", { hidden: true });
    const visiblePanels = allTabPanels.filter(
      (panel) => !panel.hasAttribute("hidden"),
    );
    expect(visiblePanels).toHaveLength(1); // Only one panel should be visible
  });

  it("supports controlled mode", async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();

    render(
      <Tabs value="tab1" onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    expect(handleValueChange).toHaveBeenCalledWith("tab2");
  });

  it("applies custom className to tabs list", () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>,
    );

    const list = container.querySelector(".custom-list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass("custom-list");
  });

  it("applies custom className to tab trigger", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>,
    );

    const trigger = screen.getByRole("tab", { name: "Tab 1" });
    expect(trigger).toHaveClass("custom-trigger");
  });

  it("applies custom className to tab content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">
          Content 1
        </TabsContent>
      </Tabs>,
    );

    const content = screen.getByText("Content 1");
    expect(content).toHaveClass("custom-content");
  });

  it("forwards ref to tabs list", () => {
    const ref = vi.fn();

    render(
      <Tabs defaultValue="tab1">
        <TabsList ref={ref}>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref to tab trigger", () => {
    const ref = vi.fn();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger ref={ref} value="tab1">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
      </Tabs>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("forwards ref to tab content", () => {
    const ref = vi.fn();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent ref={ref} value="tab1">
          Content 1
        </TabsContent>
      </Tabs>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("supports keyboard navigation with arrow keys", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>,
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    // Focus first tab
    tab1.focus();
    expect(tab1).toHaveFocus();

    // Press ArrowRight to move to next tab
    await user.keyboard("{ArrowRight}");
    expect(tab2).toHaveFocus();
  });

  it("handles disabled tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2" disabled>
            Tab 2 (Disabled)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2 (Disabled)" });
    expect(tab2).toBeDisabled();
  });

  it("applies active state styling to selected tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    expect(tab1).toHaveAttribute("data-state", "active");
    expect(tab2).toHaveAttribute("data-state", "inactive");
  });

  it("renders multiple tab panels with different content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Home</TabsTrigger>
          <TabsTrigger value="tab2">Profile</TabsTrigger>
          <TabsTrigger value="tab3">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <h2>Home Content</h2>
        </TabsContent>
        <TabsContent value="tab2">
          <h2>Profile Content</h2>
        </TabsContent>
        <TabsContent value="tab3">
          <h2>Settings Content</h2>
        </TabsContent>
      </Tabs>,
    );

    // Only the active tab content should be visible
    expect(screen.getByRole("heading", { name: "Home Content" })).toBeVisible();

    // Verify other content exists but is hidden (has hidden attribute)
    const allTabPanels = screen.getAllByRole("tabpanel", { hidden: true });
    expect(allTabPanels).toHaveLength(3);
  });

  it("preserves tab content state when switching tabs", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <input type="text" defaultValue="test" />
        </TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "new value");

    // Switch to tab 2
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    // Switch back to tab 1
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    await user.click(tab1);

    // Input value should be preserved
    expect(input).toHaveValue("new value");
  });
});

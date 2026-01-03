import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "../../test/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet";

describe("Sheet", () => {
  describe("Sheet (root)", () => {
    it("does not render when closed", () => {
      render(
        <Sheet onOpenChange={vi.fn()} open={false}>
          <SheetContent>
            <p>Content</p>
          </SheetContent>
        </Sheet>,
      );
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("renders when open", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <p>Content</p>
          </SheetContent>
        </Sheet>,
      );
      await waitFor(() => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      });
    });

    it("calls onOpenChange when ESC is pressed", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Sheet onOpenChange={onOpenChange} open>
          <SheetContent>
            <p>Content</p>
          </SheetContent>
        </Sheet>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("does not call onOpenChange when ESC is pressed and closeOnEsc is false", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Sheet closeOnEsc={false} onOpenChange={onOpenChange} open>
          <SheetContent>
            <p>Content</p>
          </SheetContent>
        </Sheet>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it("locks body scroll when open", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <p>Content</p>
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        expect(document.body.style.overflow).toBe("hidden");
      });
    });
  });

  describe("SheetContent", () => {
    it("renders with role dialog", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent data-testid="sheet-content">Content</SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("sheet-content");
        expect(content).toHaveAttribute("role", "dialog");
      });
    });

    it("has aria-modal attribute", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent data-testid="sheet-content">Content</SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("sheet-content");
        expect(content).toHaveAttribute("aria-modal", "true");
      });
    });

    it("renders close button by default", async () => {
      const onOpenChange = vi.fn();
      const handleClose = (): void => {
        onOpenChange(false);
      };
      render(
        <Sheet onOpenChange={onOpenChange} open>
          <SheetContent onClose={handleClose}>Content</SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const closeButton = screen.getByLabelText("Close sheet");
        expect(closeButton).toBeInTheDocument();
      });
    });

    it("does not render close button when showClose is false", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent showClose={false}>Content</SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        expect(screen.queryByLabelText("Close sheet")).not.toBeInTheDocument();
      });
    });

    it("calls onClose when close button is clicked", async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent onClose={onClose}>Content</SheetContent>
        </Sheet>,
      );

      await waitFor(async () => {
        const closeButton = screen.getByLabelText("Close sheet");
        await user.click(closeButton);
        expect(onClose).toHaveBeenCalled();
      });
    });

    it("applies correct side variant classes", async () => {
      const { rerender } = render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent data-testid="sheet-content" side="left">
            Content
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("sheet-content");
        expect(content).toHaveClass("left-0");
      });

      rerender(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent data-testid="sheet-content" side="right">
            Content
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const content = screen.getByTestId("sheet-content");
        expect(content).toHaveClass("right-0");
      });
    });
  });

  describe("SheetHeader", () => {
    it("renders children", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <SheetHeader>
              <p>Header content</p>
            </SheetHeader>
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        expect(screen.getByText("Header content")).toBeInTheDocument();
      });
    });
  });

  describe("SheetTitle", () => {
    it("renders as h2 element", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <SheetTitle data-testid="title">Title</SheetTitle>
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const title = screen.getByTestId("title");
        expect(title.tagName).toBe("H2");
      });
    });
  });

  describe("SheetDescription", () => {
    it("renders as paragraph element", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <SheetDescription data-testid="description">
              Description
            </SheetDescription>
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        const description = screen.getByTestId("description");
        expect(description.tagName).toBe("P");
      });
    });
  });

  describe("SheetFooter", () => {
    it("renders children", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <SheetFooter>
              <p>Footer content</p>
            </SheetFooter>
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        expect(screen.getByText("Footer content")).toBeInTheDocument();
      });
    });
  });

  describe("Complete sheet", () => {
    it("renders full sheet with all parts", async () => {
      render(
        <Sheet onOpenChange={vi.fn()} open>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>Sheet Description</SheetDescription>
            </SheetHeader>
            <div>Main content</div>
            <SheetFooter>
              <button type="button">Action</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>,
      );

      await waitFor(() => {
        expect(screen.getByText("Sheet Title")).toBeInTheDocument();
        expect(screen.getByText("Sheet Description")).toBeInTheDocument();
        expect(screen.getByText("Main content")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
      });
    });
  });
});

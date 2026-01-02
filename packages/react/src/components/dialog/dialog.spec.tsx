import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

describe("Dialog", () => {
  it("renders when open", () => {
    render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Dialog onOpenChange={vi.fn()} open={false}>
        <DialogContent onClose={vi.fn()}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when ESC key is pressed", async () => {
    const handleOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={handleOpenChange} open>
        <DialogContent onClose={handleOpenChange}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("does not close on ESC when closeOnEsc is false", () => {
    const handleOpenChange = vi.fn();
    render(
      <Dialog closeOnEsc={false} onOpenChange={handleOpenChange} open>
        <DialogContent onClose={handleOpenChange}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it("calls onOpenChange when overlay is clicked", async () => {
    const handleOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={handleOpenChange} open>
        <DialogContent onClose={handleOpenChange}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    // Find the overlay div (not the wrapper)
    const overlay = document.querySelector(".fixed.inset-0.z-50");
    if (overlay) {
      fireEvent.click(overlay);
    }

    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("does not close on overlay click when closeOnOverlayClick is false", () => {
    const handleOpenChange = vi.fn();
    render(
      <Dialog closeOnOverlayClick={false} onOpenChange={handleOpenChange} open>
        <DialogContent onClose={handleOpenChange}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const overlay = document.querySelector(".fixed.inset-0.z-50");
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = vi.fn();
    render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={handleClose}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const closeButton = screen.getByLabelText("Close dialog");
    await userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it("does not show close button when showClose is false", () => {
    render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()} showClose={false}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByLabelText("Close dialog")).not.toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { rerender } = render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()} size="sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    let dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("max-w-sm");

    rerender(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()} size="lg">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("max-w-2xl");
  });

  it("renders DialogHeader correctly", () => {
    render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()}>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders DialogFooter with actions", () => {
    render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()}>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()}>
          <DialogHeader>
            <DialogTitle>Accessible Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("locks body scroll when open", () => {
    const originalOverflow = document.body.style.overflow;

    const { unmount } = render(
      <Dialog onOpenChange={vi.fn()} open>
        <DialogContent onClose={vi.fn()}>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe(originalOverflow);
  });
});

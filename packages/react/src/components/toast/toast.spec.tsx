import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { Toaster } from "./toaster";
import { toast } from "./use-toast";

describe("Toast", () => {
  it("renders toast with title", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Test Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
  });

  it("renders toast with title and description", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your changes have been saved</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(
      screen.getByText("Your changes have been saved"),
    ).toBeInTheDocument();
  });

  it("renders toast with action button", () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>File deleted</ToastTitle>
          <ToastAction altText="Undo deletion">Undo</ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(screen.getByRole("button", { name: /undo/i })).toBeInTheDocument();
  });

  it("renders close button", () => {
    const { container } = render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Toast</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const closeButton = container.querySelector("[toast-close]");
    expect(closeButton).toBeInTheDocument();
  });

  it.skip("calls onOpenChange when close button is clicked", async () => {
    // Skipped: happy-dom limitation with hasPointerCapture
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    const { container } = render(
      <ToastProvider>
        <Toast onOpenChange={handleOpenChange} open>
          <ToastTitle>Toast</ToastTitle>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const closeButton = container.querySelector("[toast-close]");
    if (closeButton) {
      await user.click(closeButton);
    }

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("applies default variant styles", () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="default">
          <ToastTitle>Default Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass("bg-white");
  });

  it("applies destructive variant styles", () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="destructive">
          <ToastTitle>Error Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass("bg-red-500");
  });

  it("applies success variant styles", () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="success">
          <ToastTitle>Success Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass("bg-green-500");
  });

  it("forwards ref to toast element", () => {
    const ref = vi.fn();

    render(
      <ToastProvider>
        <Toast open ref={ref}>
          <ToastTitle>Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ToastProvider>
        <Toast className="custom-class" open>
          <ToastTitle>Toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );

    const toastElement = container.querySelector('[data-state="open"]');
    expect(toastElement).toHaveClass("custom-class");
  });
});

describe("Toaster with useToast", () => {
  it("renders toasts from toast() function", async () => {
    render(<Toaster />);

    toast({
      title: "Notification",
      description: "This is a test notification",
    });

    await waitFor(() => {
      expect(screen.getByText("Notification")).toBeInTheDocument();
      expect(
        screen.getByText("This is a test notification"),
      ).toBeInTheDocument();
    });
  });

  it("renders toast with action", async () => {
    render(<Toaster />);

    toast({
      title: "File deleted",
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });

    await waitFor(() => {
      expect(screen.getByText("File deleted")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /undo/i })).toBeInTheDocument();
    });
  });

  it.skip("dismisses toast when close button is clicked", async () => {
    // Skipped: happy-dom limitation with hasPointerCapture
    const user = userEvent.setup();
    const { container } = render(<Toaster />);

    toast({
      title: "Dismissible Toast",
    });

    await waitFor(() => {
      expect(screen.getByText("Dismissible Toast")).toBeInTheDocument();
    });

    const closeButton = container.querySelector("[toast-close]");
    if (closeButton) {
      await user.click(closeButton);
    }

    await waitFor(() => {
      expect(screen.queryByText("Dismissible Toast")).not.toBeInTheDocument();
    });
  });

  it("renders different toast variants", async () => {
    const { container } = render(<Toaster />);

    toast({
      title: "Success",
      variant: "success",
    });

    await waitFor(() => {
      const toastElement = container.querySelector('[data-state="open"]');
      expect(toastElement).toHaveClass("bg-green-500");
    });
  });
});

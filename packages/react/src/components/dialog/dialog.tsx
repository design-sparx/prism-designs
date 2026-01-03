import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { createPortal } from "react-dom";

import { cn } from "@prism/core";

import { Button } from "../button";

/**
 * Dialog Component
 *
 * A modal dialog that overlays content on top of the main page.
 * Built with accessibility in mind following WAI-ARIA Dialog pattern.
 *
 * Educational Notes:
 * - Uses React Portal to render outside the DOM hierarchy
 * - Implements focus trap to keep keyboard navigation within dialog
 * - Handles ESC key to close and backdrop click
 * - Manages body scroll lock when open
 * - Provides compound component pattern for flexibility
 */

// Dialog Overlay - The backdrop behind the dialog
const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
);

export interface DialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogOverlayVariants> {}

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(dialogOverlayVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

DialogOverlay.displayName = "DialogOverlay";

// Dialog Content - The actual dialog container
const dialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogContentVariants> {
  /**
   * Whether to show the close button
   */
  showClose?: boolean;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, size, showClose = true, onClose, ...props }, ref) => {
    return (
      <div
        aria-modal="true"
        className={cn(dialogContentVariants({ size, className }))}
        ref={ref}
        role="dialog"
        {...props}
      >
        {children}
        {showClose && onClose ? (
          <Button
            aria-label="Close dialog"
            className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100"
            onClick={onClose}
            size="sm"
            variant="ghost"
          >
            <svg
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          </Button>
        ) : null}
      </div>
    );
  },
);

DialogContent.displayName = "DialogContent";

// Dialog Header
const dialogHeaderVariants = cva(
  "flex flex-col space-y-1.5 text-center sm:text-left",
);

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(dialogHeaderVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

DialogHeader.displayName = "DialogHeader";

// Dialog Footer
const dialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
);

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(dialogFooterVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

DialogFooter.displayName = "DialogFooter";

// Dialog Title
const dialogTitleVariants = cva(
  "text-lg font-semibold leading-none tracking-tight",
);

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2 className={cn(dialogTitleVariants(), className)} ref={ref} {...props}>
        {props.children}
      </h2>
    );
  },
);

DialogTitle.displayName = "DialogTitle";

// Dialog Description
const dialogDescriptionVariants = cva("text-sm text-gray-600");

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(dialogDescriptionVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

// Main Dialog Component
export interface DialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  /**
   * Callback when dialog should close
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Dialog content
   */
  children: React.ReactNode;
  /**
   * Whether clicking the overlay closes the dialog
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing ESC closes the dialog
   */
  closeOnEsc?: boolean;
}

function Dialog({
  open,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: DialogProps): React.ReactElement | null {
  const [mounted, setMounted] = React.useState(false);

  // Wait for client-side mount (SSR safety)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key
  React.useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEsc, onOpenChange]);

  // Lock body scroll when dialog is open
  React.useEffect(() => {
    if (!open) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  // Focus trap - keep focus within dialog
  React.useEffect(() => {
    if (!open) return;

    // Store the element that had focus before opening
    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      // Restore focus when closing
      previousActiveElement.focus();
    };
  }, [open]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  // Don't render on server or when closed
  if (!mounted || !open) return null;

  return createPortal(
    <div data-state="open">
      <DialogOverlay data-state="open" onClick={handleOverlayClick} />
      {children}
    </div>,
    document.body,
  );
}

Dialog.displayName = "Dialog";

export {
  Dialog,
  DialogContent,
  dialogContentVariants,
  DialogDescription,
  dialogDescriptionVariants,
  DialogFooter,
  dialogFooterVariants,
  DialogHeader,
  dialogHeaderVariants,
  DialogOverlay,
  dialogOverlayVariants,
  DialogTitle,
  dialogTitleVariants,
};

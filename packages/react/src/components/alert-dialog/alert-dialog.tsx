import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { createPortal } from "react-dom";

import { cn } from "@prism/core";

import { Button } from "../button";

/**
 * AlertDialog Component
 *
 * A modal dialog optimized for important confirmations and destructive actions.
 * Based on Dialog but with semantics specific to alerts and confirmations.
 *
 * Educational Notes:
 * - Uses role="alertdialog" for screen readers to announce urgency
 * - Typically contains important warnings or confirmations
 * - Should have clear Cancel and Action buttons
 * - Usually prevents dismissal via overlay click (requires explicit choice)
 * - Common pattern: "Are you sure you want to delete X?"
 */

// AlertDialog Overlay - The backdrop behind the alert dialog
const alertDialogOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
);

export interface AlertDialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogOverlayVariants> {}

const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialogOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(alertDialogOverlayVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

AlertDialogOverlay.displayName = "AlertDialogOverlay";

// AlertDialog Content - The actual alert dialog container
const alertDialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg sm:rounded-lg",
);

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertDialogContentVariants> {}

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      aria-modal="true"
      className={cn(alertDialogContentVariants({ className }))}
      ref={ref}
      role="alertdialog"
      {...props}
    >
      {children}
    </div>
  );
});

AlertDialogContent.displayName = "AlertDialogContent";

// AlertDialog Header
const alertDialogHeaderVariants = cva(
  "flex flex-col space-y-2 text-center sm:text-left",
);

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  AlertDialogHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(alertDialogHeaderVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

AlertDialogHeader.displayName = "AlertDialogHeader";

// AlertDialog Footer
const alertDialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
);

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  AlertDialogFooterProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(alertDialogFooterVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

AlertDialogFooter.displayName = "AlertDialogFooter";

// AlertDialog Title
const alertDialogTitleVariants = cva(
  "text-lg font-semibold leading-none tracking-tight",
);

export type AlertDialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogTitleProps
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn(alertDialogTitleVariants(), className)}
      id="alert-dialog-title"
      ref={ref}
      {...props}
    >
      {props.children}
    </h2>
  );
});

AlertDialogTitle.displayName = "AlertDialogTitle";

// AlertDialog Description
const alertDialogDescriptionVariants = cva("text-sm text-muted-foreground");

export type AlertDialogDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(alertDialogDescriptionVariants(), className)}
      id="alert-dialog-description"
      ref={ref}
      {...props}
    />
  );
});

AlertDialogDescription.displayName = "AlertDialogDescription";

// AlertDialog Action - Primary action button (often destructive)
export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * Defaults to 'destructive' for alert dialogs
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(({ variant = "destructive", ...props }, ref) => {
  return <Button ref={ref} variant={variant} {...props} />;
});

AlertDialogAction.displayName = "AlertDialogAction";

// AlertDialog Cancel - Cancel/dismiss button
export type AlertDialogCancelProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogCancelProps
>((props, ref) => {
  return <Button ref={ref} variant="outline" {...props} />;
});

AlertDialogCancel.displayName = "AlertDialogCancel";

// Main AlertDialog Component
export interface AlertDialogProps {
  /**
   * Whether the alert dialog is open
   */
  open: boolean;
  /**
   * Callback when alert dialog should close
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Alert dialog content
   */
  children: React.ReactNode;
  /**
   * Whether clicking the overlay closes the alert dialog
   * Defaults to false for alert dialogs (requires explicit choice)
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing ESC closes the alert dialog
   * Defaults to true
   */
  closeOnEsc?: boolean;
}

function AlertDialog({
  open,
  onOpenChange,
  children,
  closeOnOverlayClick = false,
  closeOnEsc = true,
}: AlertDialogProps): React.ReactElement | null {
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

  // Lock body scroll when alert dialog is open
  React.useEffect(() => {
    if (!open) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  // Focus trap - keep focus within alert dialog
  React.useEffect(() => {
    if (!open) return;

    // Store the element that had focus before opening
    const previousActiveElement = document.activeElement as HTMLElement | null;

    return () => {
      // Restore focus when closing
      previousActiveElement?.focus();
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
      <AlertDialogOverlay data-state="open" onClick={handleOverlayClick} />
      {children}
    </div>,
    document.body,
  );
}

AlertDialog.displayName = "AlertDialog";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  alertDialogContentVariants,
  AlertDialogDescription,
  alertDialogDescriptionVariants,
  AlertDialogFooter,
  alertDialogFooterVariants,
  AlertDialogHeader,
  alertDialogHeaderVariants,
  AlertDialogOverlay,
  alertDialogOverlayVariants,
  AlertDialogTitle,
  alertDialogTitleVariants,
};

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { createPortal } from "react-dom";

import { cn } from "@prism/core";

import { Button } from "../button";

/**
 * Sheet Component
 *
 * A slide-in panel that appears from the edges of the screen.
 * Similar to Dialog but enters from the side rather than center.
 *
 * Educational Notes:
 * - Uses React Portal to render outside the DOM hierarchy
 * - Implements focus trap to keep keyboard navigation within sheet
 * - Handles ESC key to close and backdrop click
 * - Manages body scroll lock when open
 * - Provides slide-in animation from different sides
 * - Common pattern for mobile navigation and filters
 */

// Sheet Overlay - The backdrop behind the sheet
const sheetOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
);

export interface SheetOverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetOverlayVariants> {}

const SheetOverlay = React.forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(sheetOverlayVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

SheetOverlay.displayName = "SheetOverlay";

// Sheet Content - The actual sheet container
const sheetContentVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export interface SheetContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetContentVariants> {
  /**
   * Whether to show the close button
   * @default true
   */
  showClose?: boolean;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side, showClose = true, onClose, ...props }, ref) => {
    return (
      <div
        aria-modal="true"
        className={cn(sheetContentVariants({ side, className }))}
        ref={ref}
        role="dialog"
        {...props}
      >
        {children}
        {showClose && onClose ? (
          <Button
            aria-label="Close sheet"
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

SheetContent.displayName = "SheetContent";

// Sheet Header
const sheetHeaderVariants = cva(
  "flex flex-col space-y-2 text-center sm:text-left",
);

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(sheetHeaderVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

SheetHeader.displayName = "SheetHeader";

// Sheet Footer
const sheetFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
);

export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;

const SheetFooter = React.forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(sheetFooterVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

SheetFooter.displayName = "SheetFooter";

// Sheet Title
const sheetTitleVariants = cva(
  "text-lg font-semibold leading-none tracking-tight text-foreground",
);

export type SheetTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const SheetTitle = React.forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        className={cn(sheetTitleVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

SheetTitle.displayName = "SheetTitle";

// Sheet Description
const sheetDescriptionVariants = cva("text-sm text-muted-foreground");

export type SheetDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  SheetDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(sheetDescriptionVariants(), className)}
      ref={ref}
      {...props}
    />
  );
});

SheetDescription.displayName = "SheetDescription";

// Main Sheet Component
export interface SheetProps {
  /**
   * Whether the sheet is open
   */
  open: boolean;
  /**
   * Callback when sheet should close
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Sheet content
   */
  children: React.ReactNode;
  /**
   * Whether clicking the overlay closes the sheet
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing ESC closes the sheet
   * @default true
   */
  closeOnEsc?: boolean;
}

const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const [mounted, setMounted] = React.useState(false);

  // Wait for client-side mount (SSR safety)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key
  React.useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, closeOnEsc, onOpenChange]);

  // Lock body scroll when sheet is open
  React.useEffect(() => {
    if (!open) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [open]);

  // Focus trap - keep focus within sheet
  React.useEffect(() => {
    if (!open) return;

    // Store the element that had focus before opening
    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      // Restore focus when closing
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [open]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  // Don't render on server or when closed
  if (!mounted || !open) return null;

  return createPortal(
    <div data-state={open ? "open" : "closed"}>
      <SheetOverlay
        data-state={open ? "open" : "closed"}
        onClick={handleOverlayClick}
      />
      {children}
    </div>,
    document.body,
  );
};

Sheet.displayName = "Sheet";

export {
  Sheet,
  SheetContent,
  sheetContentVariants,
  SheetDescription,
  sheetDescriptionVariants,
  SheetFooter,
  sheetFooterVariants,
  SheetHeader,
  sheetHeaderVariants,
  SheetOverlay,
  sheetOverlayVariants,
  SheetTitle,
  sheetTitleVariants,
};

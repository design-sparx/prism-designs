import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@prism/core";

/**
 * ToastProvider component
 *
 * Wraps your app to enable toast notifications.
 * Must be placed at the root of your component tree.
 *
 * Educational notes:
 * - Radix Toast uses a provider pattern to manage toast state globally
 * - The provider handles viewport positioning and animation orchestration
 * - This allows toasts to be triggered from anywhere in your app
 */
const ToastProvider = ToastPrimitives.Provider;

/**
 * ToastViewport component
 *
 * Defines the fixed area where toasts will appear.
 * Typically positioned at the top-right or bottom-right of the screen.
 *
 * Educational notes:
 * - The viewport is a portal container that renders outside normal DOM flow
 * - Fixed positioning ensures toasts stay visible during scrolling
 * - z-index ensures toasts appear above other content
 */
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]",
      className,
    )}
    ref={ref}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Toast variant styles
 *
 * Educational notes:
 * - 'default': Neutral gray background for general notifications
 * - 'destructive': Red background for errors or destructive actions
 * - 'success': Green background for successful operations
 * - Compound variants allow combining variants for different states
 */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-white text-gray-950",
        destructive: "destructive group border-red-500 bg-red-500 text-white",
        success: "border-green-500 bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * Toast component
 *
 * Displays a temporary notification message.
 *
 * Educational notes:
 * - Toasts auto-dismiss after a duration (default 5000ms)
 * - Supports swipe-to-dismiss on touch devices
 * - ARIA live region announces content to screen readers
 * - Forwards ref to allow programmatic control
 */
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      className={cn(toastVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * ToastAction component
 *
 * Renders an action button within a toast.
 *
 * Educational notes:
 * - Actions allow users to respond to notifications (e.g., "Undo", "View")
 * - altText is required for accessibility (announces to screen readers)
 * - Clicking an action automatically dismisses the toast
 * - Actions should be concise (1-2 words)
 */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-white transition-colors group-[.destructive]:border-red-100 hover:bg-gray-100 group-[.destructive]:hover:border-red-50 group-[.destructive]:hover:bg-red-50 group-[.destructive]:hover:text-red-600 focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 focus:outline-none group-[.destructive]:focus:ring-red-400 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * ToastClose component
 *
 * Renders a close button to manually dismiss a toast.
 *
 * Educational notes:
 * - Provides explicit dismiss control (in addition to auto-dismiss)
 * - Uses an X icon for universal recognition
 * - Positioned absolutely in the top-right corner
 * - Respects variant styles (e.g., white text on destructive toasts)
 */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    className={cn(
      "absolute top-2 right-2 rounded-md p-1 text-gray-950/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-50 hover:text-gray-950 group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:ring-2 focus:outline-none group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    ref={ref}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * ToastTitle component
 *
 * Renders the title/heading of a toast.
 *
 * Educational notes:
 * - Acts as the primary message of the notification
 * - Should be concise and descriptive
 * - Semantically rendered as a heading for accessibility
 */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    className={cn("text-sm font-semibold", className)}
    ref={ref}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * ToastDescription component
 *
 * Renders optional supporting text within a toast.
 *
 * Educational notes:
 * - Provides additional context or details
 * - Should be brief (1-2 sentences max)
 * - Uses smaller, less prominent styling than the title
 */
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    className={cn("text-sm opacity-90", className)}
    ref={ref}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  toastVariants,
  ToastViewport,
};

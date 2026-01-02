import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";

/**
 * Toaster component
 *
 * Renders all active toasts in a viewport container.
 * Must be placed in your app's root layout.
 *
 * Educational notes:
 * - This component subscribes to toast state via useToast hook
 * - Automatically renders all active toasts
 * - No props needed - completely self-contained
 * - Place once in your app, trigger toasts from anywhere
 *
 * Usage:
 * ```tsx
 * // In your root layout/app component
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <Toaster />
 *     </>
 *   );
 * }
 *
 * // Anywhere in your app
 * import { toast } from '@prism/react/toast';
 *
 * function MyComponent() {
 *   return (
 *     <button onClick={() => toast({ title: "Hello!" })}>
 *       Show Toast
 *     </button>
 *   );
 * }
 * ```
 */
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

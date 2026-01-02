import * as React from "react";
import type { ToastActionElement, ToastProps } from "./toast";

/**
 * Maximum number of toasts that can be displayed at once
 *
 * Educational notes:
 * - Prevents toast spam by limiting concurrent notifications
 * - When limit is reached, oldest toasts are auto-dismissed
 * - Industry standard is 3-5 toasts (we use 1 for simplicity)
 */
const TOAST_LIMIT = 1;

/**
 * Auto-dismiss duration in milliseconds
 *
 * Educational notes:
 * - Default 5 seconds gives users time to read the message
 * - Can be overridden per-toast for important messages
 * - Follows WCAG 2.1 guidelines for timing adjustable
 */
const TOAST_REMOVE_DELAY = 1000000;

/**
 * Toast state type definition
 *
 * Educational notes:
 * - 'id' uniquely identifies each toast for updates/dismissal
 * - 'title' and 'description' are the primary content
 * - 'action' allows adding interactive buttons (e.g., "Undo")
 * - Extends ToastProps to inherit all toast component props
 */
export type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

/**
 * Action types for the toast reducer
 *
 * Educational notes:
 * - This is a standard Redux-style action pattern
 * - Each action type corresponds to a toast lifecycle event
 * - Type unions ensure type safety in the reducer
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

/**
 * Generates a unique ID for each toast
 *
 * Educational notes:
 * - Simple counter-based ID generation
 * - In production, consider using UUID or nanoid for guaranteed uniqueness
 * - IDs are used to update/dismiss specific toasts
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

/**
 * Toast removal timers
 *
 * Educational notes:
 * - Tracks setTimeout IDs for each toast's auto-dismiss timer
 * - Allows clearing timers when toasts are manually dismissed
 * - Prevents memory leaks by cleaning up timers
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adds a toast removal timer
 *
 * Educational notes:
 * - Schedules automatic removal after TOAST_REMOVE_DELAY
 * - Clears any existing timer for the same toast ID
 * - This prevents duplicate timers when updating a toast
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Toast state reducer
 *
 * Educational notes:
 * - Manages toast state using React's useReducer pattern
 * - Handles adding, updating, dismissing, and removing toasts
 * - Enforces TOAST_LIMIT by dismissing oldest toasts
 * - This is a common pattern in state management libraries
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

/**
 * Listener functions for toast state changes
 *
 * Educational notes:
 * - Allows components to subscribe to toast state updates
 * - This is a simple pub/sub pattern for cross-component communication
 * - The Toaster component subscribes to render toasts
 */
const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

/**
 * Dispatches actions to update toast state
 *
 * Educational notes:
 * - Updates the in-memory state
 * - Notifies all subscribed listeners
 * - This allows the hook to work outside of React components
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * Toast function type definition
 *
 * Educational notes:
 * - Omits 'id' from props (auto-generated)
 * - Returns toast object with all properties for updates
 */
type Toast = Omit<ToasterToast, "id">;

/**
 * Creates a new toast
 *
 * Educational notes:
 * - Can be called from anywhere (not just React components)
 * - Automatically generates a unique ID
 * - Returns the toast object for programmatic updates
 * - This is the primary API for showing toasts
 */
function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * useToast hook
 *
 * Educational notes:
 * - Subscribes to toast state changes
 * - Re-renders component when toasts are added/removed
 * - Returns toast function and current toasts array
 * - Cleans up listener on unmount to prevent memory leaks
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };

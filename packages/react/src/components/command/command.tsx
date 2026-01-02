import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";

import { cn } from "@prism/core";

/**
 * Command Component
 *
 * A command palette/search interface with keyboard navigation.
 * Popular pattern for quick actions and search (e.g., Cmd+K interfaces).
 *
 * Educational Notes:
 * - Implements keyboard navigation with arrow keys
 * - Provides search/filter functionality
 * - Uses role="combobox" for accessibility
 * - Common in modern apps (VS Code, GitHub, Linear, etc.)
 * - Can be combined with Dialog for modal command palette
 *
 * Component composition pattern:
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandEmpty>No results</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Item 1</CommandItem>
 *       <CommandItem>Item 2</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 */

// Command Root
const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-foreground",
);

export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled search value
   */
  value?: string;
  /**
   * Callback when search value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Filter function for items
   * By default, filters by text content
   */
  filter?: (value: string, search: string) => boolean;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, value, onValueChange, filter, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState("");
    const searchValue = value ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    };

    // Provide search context to children
    const contextValue = React.useMemo(
      () => ({
        search: searchValue,
        onSearchChange: handleValueChange,
        filter,
      }),
      [searchValue, filter],
    );

    return (
      <CommandContext.Provider value={contextValue}>
        <div
          className={cn(commandVariants(), className)}
          ref={ref}
          role="combobox"
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  },
);

Command.displayName = "Command";

// Command Context
interface CommandContextValue {
  search: string;
  onSearchChange: (value: string) => void;
  filter?: (value: string, search: string) => boolean;
}

const CommandContext = React.createContext<CommandContextValue>({
  search: "",
  onSearchChange: () => {},
});

const useCommand = () => React.useContext(CommandContext);

// Command Input
const commandInputVariants = cva(
  "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
);

export interface CommandInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { search, onSearchChange } = useCommand();

    return (
      <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className={cn(commandInputVariants(), className)}
          onChange={(e) => onSearchChange(e.target.value)}
          ref={ref}
          value={search}
          {...props}
        />
      </div>
    );
  },
);

CommandInput.displayName = "CommandInput";

// Command List
const commandListVariants = cva(
  "max-h-[300px] overflow-y-auto overflow-x-hidden",
);

export interface CommandListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(commandListVariants(), className)}
        ref={ref}
        role="listbox"
        {...props}
      >
        {children}
      </div>
    );
  },
);

CommandList.displayName = "CommandList";

// Command Empty
const commandEmptyVariants = cva(
  "py-6 text-center text-sm text-muted-foreground",
);

export interface CommandEmptyProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(commandEmptyVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

CommandEmpty.displayName = "CommandEmpty";

// Command Group
const commandGroupVariants = cva(
  "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
);

export interface CommandGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group heading
   */
  heading?: string;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div
        className={cn(commandGroupVariants(), className)}
        ref={ref}
        role="group"
        {...props}
      >
        {heading ? <div cmdk-group-heading="">{heading}</div> : null}
        {children}
      </div>
    );
  },
);

CommandGroup.displayName = "CommandGroup";

// Command Separator
const commandSeparatorVariants = cva("-mx-1 h-px bg-border");

export interface CommandSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      aria-hidden="true"
      className={cn(commandSeparatorVariants(), className)}
      ref={ref}
      role="separator"
      {...props}
    />
  );
});

CommandSeparator.displayName = "CommandSeparator";

// Command Item
const commandItemVariants = cva(
  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
);

export interface CommandItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /**
   * Value for filtering
   * If not provided, uses children text content
   */
  value?: string;
  /**
   * Callback when item is selected
   */
  onSelect?: (value: string) => void;
  /**
   * Whether the item is disabled
   */
  disabled?: boolean;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value, onSelect, disabled, children, ...props }, ref) => {
    const { search, filter } = useCommand();

    // Default filter: case-insensitive includes
    const defaultFilter = (itemValue: string, searchValue: string) => {
      return itemValue.toLowerCase().includes(searchValue.toLowerCase());
    };

    const filterFn = filter ?? defaultFilter;
    const itemValue = value ?? (typeof children === "string" ? children : "");

    // Hide item if it doesn't match search
    const shouldShow = !search || filterFn(itemValue, search);

    if (!shouldShow) {
      return null;
    }

    return (
      <div
        className={cn(commandItemVariants(), className)}
        data-disabled={disabled ? "" : undefined}
        onClick={() => {
          if (!disabled && onSelect) {
            onSelect(itemValue);
          }
        }}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            if (onSelect) {
              onSelect(itemValue);
            }
          }
        }}
        ref={ref}
        role="option"
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CommandItem.displayName = "CommandItem";

// Command Shortcut
const commandShortcutVariants = cva(
  "ml-auto text-xs tracking-widest text-muted-foreground",
);

export interface CommandShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn(commandShortcutVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  commandVariants,
  CommandInput,
  commandInputVariants,
  CommandList,
  commandListVariants,
  CommandEmpty,
  commandEmptyVariants,
  CommandGroup,
  commandGroupVariants,
  CommandItem,
  commandItemVariants,
  CommandSeparator,
  commandSeparatorVariants,
  CommandShortcut,
  commandShortcutVariants,
};

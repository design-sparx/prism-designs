import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@prism/core";

/**
 * Breadcrumb - Navigation component showing hierarchical path
 *
 * Educational notes:
 * - Uses semantic <nav> element with aria-label for accessibility
 * - Implements ARIA breadcrumb pattern for screen readers
 * - Provides visual and semantic separation between items
 * - Last item is marked as current page (aria-current="page")
 *
 * Component composition pattern:
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink>Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /**
   * Accessible label for the breadcrumb navigation
   * Defaults to "breadcrumb"
   */
  "aria-label"?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ "aria-label": ariaLabel = "breadcrumb", ...props }, ref) => (
    <nav aria-label={ariaLabel} ref={ref} {...props} />
  ),
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"ol"> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      className={cn(
        // Flex layout with wrapped items
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"li"> {}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      ref={ref}
      {...props}
    />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      className={cn(
        // Interactive link styles
        "hover:text-foreground transition-colors",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbPageProps
  extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      aria-current="page"
      aria-disabled="true"
      className={cn(
        // Current page is not interactive
        "text-foreground font-normal",
        className,
      )}
      ref={ref}
      role="link"
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<"li"> {
  /**
   * Custom separator element
   * Defaults to ChevronRight icon
   */
  children?: React.ReactNode;
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => (
  <li
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    ref={ref}
    role="presentation"
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbEllipsisProps
  extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    ref={ref}
    role="presentation"
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

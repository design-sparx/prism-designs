/**
 * Card Component System
 *
 * A flexible card component built with composable subcomponents:
 * - Card: Container component
 * - CardHeader: Top section for titles and actions
 * - CardContent: Main content area
 * - CardFooter: Bottom section for actions
 *
 * Educational Notes:
 * - Uses composition pattern (smaller components build larger ones)
 * - Each subcomponent is simple and focused
 * - No complex state management needed
 * - Semantic HTML structure for accessibility
 */

import * as React from "react";

import { cn } from "@prism/core";

/**
 * Card - Container Component
 *
 * Educational Note:
 * - Simple div wrapper with border and padding
 * - No variants needed (cards are consistently styled)
 * - Uses forwardRef for DOM access
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends HTMLAttributes for full HTML compatibility
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "rounded-lg border border-neutral-200 bg-white shadow-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

/**
 * CardHeader - Top Section
 *
 * Educational Note:
 * - Contains title, description, and optional actions
 * - Consistent padding for visual rhythm
 * - Flexible layout (can contain any children)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends HTMLAttributes for full HTML compatibility
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

CardHeader.displayName = "CardHeader";

/**
 * CardTitle - Header Title
 *
 * Educational Note:
 * - Semantic heading element (h3)
 * - Larger font for hierarchy
 * - Can be replaced with h2, h4, etc. based on page context
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends HTMLAttributes for full HTML compatibility
export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        className={cn("text-2xl leading-none font-semibold", className)}
        ref={ref}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "CardTitle";

/**
 * CardDescription - Subtitle/Description
 *
 * Educational Note:
 * - Paragraph element for semantic HTML
 * - Muted color for visual hierarchy
 * - Smaller text than title
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends HTMLAttributes for full HTML compatibility
export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("text-sm text-neutral-600", className)}
      ref={ref}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

/**
 * CardContent - Main Content Area
 *
 * Educational Note:
 * - Where your main content lives (forms, text, images)
 * - Consistent padding (matches header)
 * - pt-0 removes top padding when used after CardHeader
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends HTMLAttributes for full HTML compatibility
export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />;
  },
);

CardContent.displayName = "CardContent";

/**
 * CardFooter - Bottom Section
 *
 * Educational Note:
 * - Typically contains action buttons
 * - Flex layout for button alignment
 * - Matches padding with header/content
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface -- Extends HTMLAttributes for full HTML compatibility
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("flex items-center p-6 pt-0", className)}
        ref={ref}
        {...props}
      />
    );
  },
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};

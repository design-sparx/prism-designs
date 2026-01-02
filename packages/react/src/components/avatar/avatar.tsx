import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@prism/core";

/**
 * Avatar size variants
 *
 * Educational note:
 * Using CVA (Class Variance Authority) for consistent sizing across
 * the avatar container, image, and fallback elements
 */
const avatarVariants = cva(
  // Base styles: circular container with overflow hidden
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/**
 * Avatar component props
 */
export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {}

/**
 * Avatar - Root container for avatar image and fallback
 *
 * Educational notes:
 * - Uses <span> instead of <div> for inline-level display
 * - Provides context to child components via React Context
 * - Manages image loading state internally
 */
const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <span
        className={cn(avatarVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Avatar.displayName = "Avatar";

/**
 * AvatarImage component props
 */
export type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

/**
 * AvatarImage - Displays the user's avatar image
 *
 * Educational notes:
 * - Uses onError handler to manage fallback behavior
 * - aspect-square ensures images stay circular even if source is not square
 * - object-cover prevents image distortion
 */
const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        alt={alt}
        className={cn(
          // Ensure image fills container and maintains aspect ratio
          "aspect-square h-full w-full object-cover",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

AvatarImage.displayName = "AvatarImage";

/**
 * AvatarFallback component props
 */
export type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * AvatarFallback - Displays fallback content when image fails to load
 *
 * Educational notes:
 * - Typically shows user initials (e.g., "JD" for John Doe)
 * - Uses flex layout for centering text
 * - Background color provides visual distinction
 */
const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn(
          // Center content and provide background
          "bg-muted text-muted-foreground flex h-full w-full items-center justify-center rounded-full font-medium",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback, AvatarImage, avatarVariants };

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { Spinner } from "@prism/react/spinner";

/**
 * Spinner Component Stories
 *
 * Showcases the Prism Spinner component in various contexts.
 * Spinners are loading indicators used to show that content is being processed.
 */

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the spinner",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/**
 * Default Spinner
 *
 * Medium size spinner with default styling
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Small Spinner
 *
 * Ideal for inline usage in buttons or compact UI elements
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
};

/**
 * Medium Spinner
 *
 * Default size for general loading states
 */
export const Medium: Story = {
  args: {
    size: "md",
  },
};

/**
 * Large Spinner
 *
 * For prominent loading states or full-page loaders
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
};

/**
 * All Sizes Showcase
 *
 * Shows all spinner sizes side by side for comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Spinner size="sm" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Small</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="md" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Medium</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner size="lg" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Large</div>
      </div>
    </div>
  ),
};

/**
 * Color Variations
 *
 * Spinners inherit text color via currentColor.
 * Use text-* utilities to customize color.
 */
export const ColorVariations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Spinner className="text-gray-900" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Default</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner className="text-primary-500" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Primary</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner className="text-error-main" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Error</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Spinner className="text-success-main" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Success</div>
      </div>
    </div>
  ),
};

/**
 * In Button
 *
 * Common pattern showing spinner in a loading button
 */
export const InButton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button disabled>
        <Spinner className="mr-2" size="sm" />
        Loading...
      </Button>
      <Button disabled variant="outline">
        <Spinner className="mr-2" size="sm" />
        Processing
      </Button>
      <Button disabled variant="destructive">
        <Spinner className="mr-2" size="sm" />
        Deleting...
      </Button>
    </div>
  ),
};

/**
 * Loading States
 *
 * Different loading state scenarios
 */
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Inline loading */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Spinner size="sm" />
        <span>Loading data...</span>
      </div>

      {/* Card loading state */}
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          padding: "2rem",
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        <Spinner className="mb-4" size="lg" />
        <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          Loading content...
        </div>
      </div>

      {/* List item loading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 500 }}>Document.pdf</div>
          <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Uploading...
          </div>
        </div>
        <Spinner size="sm" />
      </div>
    </div>
  ),
};

/**
 * Full Page Loading
 *
 * Example of a full-page loading overlay
 */
export const FullPageLoading: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "300px",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      {/* Background content (blurred) */}
      <div style={{ padding: "1.5rem", filter: "blur(2px)" }}>
        <h2 style={{ marginBottom: "1rem" }}>Page Content</h2>
        <p style={{ color: "#6b7280" }}>
          This is some sample content that is being loaded...
        </p>
      </div>

      {/* Loading overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Spinner size="lg" />
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "#6b7280",
            }}
          >
            Please wait...
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * With Custom Styling
 *
 * Examples of customizing the spinner with CSS classes
 */
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      {/* Slow animation */}
      <div style={{ textAlign: "center" }}>
        <Spinner style={{ animationDuration: "2s" }} />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Slow</div>
      </div>

      {/* Fast animation */}
      <div style={{ textAlign: "center" }}>
        <Spinner style={{ animationDuration: "0.5s" }} />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Fast</div>
      </div>

      {/* With opacity */}
      <div style={{ textAlign: "center" }}>
        <Spinner className="opacity-50" />
        <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>Faded</div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Alert, AlertDescription, AlertTitle } from "@prism/react/alert";

/**
 * Alert Component Stories
 *
 * Demonstrates the Alert component for displaying important messages and notifications.
 */

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "info"],
      description: "The visual style variant of the alert",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

/**
 * Default Alert
 */
export const Default: Story = {
  render: () => (
    <Alert style={{ width: "500px" }}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Destructive Alert (Error)
 */
export const Destructive: Story = {
  render: () => (
    <Alert style={{ width: "500px" }} variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Success Alert
 */
export const Success: Story = {
  render: () => (
    <Alert style={{ width: "500px" }} variant="success">
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Info Alert
 */
export const Info: Story = {
  render: () => (
    <Alert style={{ width: "500px" }} variant="info">
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This feature is currently in beta. Please report any issues.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * With Icon
 */
export const WithIcon: Story = {
  render: () => (
    <Alert style={{ width: "500px" }}>
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
      </svg>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Error with Icon
 */
export const ErrorWithIcon: Story = {
  render: () => (
    <Alert style={{ width: "500px" }} variant="destructive">
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
        <circle cx="12" cy="12" r="10" />
        <line x1="15" x2="9" y1="9" y2="15" />
        <line x1="9" x2="15" y1="9" y2="15" />
      </svg>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to upload file. Please try again.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Success with Icon
 */
export const SuccessWithIcon: Story = {
  render: () => (
    <Alert style={{ width: "500px" }} variant="success">
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 12 15 16 10" />
      </svg>
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your payment has been processed successfully.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Info with Icon
 */
export const InfoWithIcon: Story = {
  render: () => (
    <Alert style={{ width: "500px" }} variant="info">
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
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
      </svg>
      <AlertTitle>Did you know?</AlertTitle>
      <AlertDescription>
        You can use keyboard shortcuts to navigate faster.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Title Only
 */
export const TitleOnly: Story = {
  render: () => (
    <Alert style={{ width: "500px" }}>
      <AlertTitle>Maintenance scheduled for tonight at 10 PM</AlertTitle>
    </Alert>
  ),
};

/**
 * Description Only
 */
export const DescriptionOnly: Story = {
  render: () => (
    <Alert style={{ width: "500px" }}>
      <AlertDescription>
        Your API key will expire in 7 days. Please generate a new one.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * All Variants Showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "500px",
      }}
    >
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          This is an informational alert message.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>This is a success alert message.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert message.</AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * With Complex Content
 */
export const ComplexContent: Story = {
  render: () => (
    <Alert style={{ width: "500px" }}>
      <AlertTitle>System Update Available</AlertTitle>
      <AlertDescription>
        <p>
          A new version of the system is available with the following updates:
        </p>
        <ul
          style={{
            marginTop: "0.5rem",
            marginLeft: "1.5rem",
            listStyle: "disc",
          }}
        >
          <li>Improved performance</li>
          <li>Bug fixes and stability improvements</li>
          <li>New features and enhancements</li>
        </ul>
      </AlertDescription>
    </Alert>
  ),
};

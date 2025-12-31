import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@prism/react/card";

/**
 * Card Component Stories
 *
 * Demonstrates the compositional Card component system.
 * Cards are built by composing smaller subcomponents together.
 */

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Basic Card
 *
 * Simple card with just content
 */
export const Basic: Story = {
  render: () => (
    <Card className="w-96">
      <CardContent>
        <p>This is a basic card with just content.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * With Header
 *
 * Card with title and description
 */
export const WithHeader: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description that provides context about the card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your card content goes here.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * With Footer
 *
 * Card with action buttons in the footer
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>
          Are you sure you want to proceed with this action?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This action cannot be undone.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Complete Card
 *
 * Card using all available subcomponents
 */
export const Complete: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>
          This card demonstrates all available sections working together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>Here&apos;s your main content area.</p>
          <p className="text-sm text-neutral-600">
            You can put forms, text, images, or any other content here.
          </p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="secondary">Secondary</Button>
        <Button>Primary</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Login Form Example
 *
 * Practical example: Card as a form container
 */
export const LoginForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded border border-neutral-300 px-3 py-2"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded border border-neutral-300 px-3 py-2"
              id="password"
              type="password"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Product Card Example
 *
 * Practical example: E-commerce product card
 */
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="mb-4 h-48 rounded bg-neutral-200" />
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>Wireless noise-cancelling headphones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-2xl font-bold">$299.99</p>
          <p className="text-sm text-neutral-600">
            Free shipping on orders over $50
          </p>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-1" variant="outline">
          Add to Wishlist
        </Button>
        <Button className="flex-1">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Notification Card Example
 *
 * Practical example: System notification
 */
export const NotificationCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">New Message</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
          <span className="text-2xl">📧</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          You have received a new message from John Doe. Click to view the full
          conversation.
        </p>
      </CardContent>
      <CardFooter>
        <Button>View Message</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Statistics Card Example
 *
 * Practical example: Dashboard statistics
 */
export const StatisticsCard: Story = {
  render: () => (
    <Card className="w-64">
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-3xl">$45,231</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-green-600">↑ 20.1% from last month</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Multiple Cards
 *
 * Shows cards in a grid layout
 */
export const MultipleCards: Story = {
  render: () => (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the first card.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the second card.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the third card.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Card 4</CardTitle>
          <CardDescription>Fourth card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the fourth card.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { Input } from "@prism/react/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@prism/react/tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Account</h3>
            <p className="text-sm text-gray-500">
              Make changes to your account here. Click save when you&apos;re
              done.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name-input">
              Name
            </label>
            <Input defaultValue="Pedro Duarte" id="name-input" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="username-input">
              Username
            </label>
            <Input defaultValue="@peduarte" id="username-input" />
          </div>
          <Button>Save changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Password</h3>
            <p className="text-sm text-gray-500">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="current-password">
              Current password
            </label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="new-password">
              New password
            </label>
            <Input id="new-password" type="password" />
          </div>
          <Button>Save password</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs className="w-[500px]" defaultValue="overview">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent className="space-y-4" value="overview">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Overview Dashboard</h3>
          <p className="text-sm text-gray-500">
            View a summary of your account activity and key metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent className="space-y-4" value="analytics">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Analytics</h3>
          <p className="text-sm text-gray-500">
            Deep dive into your data with detailed charts and insights.
          </p>
        </div>
      </TabsContent>
      <TabsContent className="space-y-4" value="reports">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Reports</h3>
          <p className="text-sm text-gray-500">
            Generate and download custom reports for your records.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="tab1">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger disabled value="tab2">
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="rounded-md border p-4">
          <p className="text-sm">This tab is available and can be selected.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="rounded-md border p-4">
          <p className="text-sm">This content is disabled.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="rounded-md border p-4">
          <p className="text-sm">This tab is also available.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs
      className="flex w-[600px] gap-4"
      defaultValue="general"
      orientation="vertical"
    >
      <TabsList className="flex h-auto flex-col items-stretch">
        <TabsTrigger className="justify-start" value="general">
          General
        </TabsTrigger>
        <TabsTrigger className="justify-start" value="security">
          Security
        </TabsTrigger>
        <TabsTrigger className="justify-start" value="integrations">
          Integrations
        </TabsTrigger>
        <TabsTrigger className="justify-start" value="advanced">
          Advanced
        </TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent className="mt-0" value="general">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">General Settings</h3>
            <p className="text-sm text-gray-500">
              Configure your general application preferences and defaults.
            </p>
          </div>
        </TabsContent>
        <TabsContent className="mt-0" value="security">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">Security Settings</h3>
            <p className="text-sm text-gray-500">
              Manage your security preferences and authentication methods.
            </p>
          </div>
        </TabsContent>
        <TabsContent className="mt-0" value="integrations">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">Integrations</h3>
            <p className="text-sm text-gray-500">
              Connect and configure third-party integrations and services.
            </p>
          </div>
        </TabsContent>
        <TabsContent className="mt-0" value="advanced">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">Advanced Settings</h3>
            <p className="text-sm text-gray-500">
              Access advanced features and experimental functionality.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const MinimalStyle: Story = {
  render: () => (
    <Tabs className="w-[400px]" defaultValue="music">
      <TabsList className="w-full justify-start bg-transparent">
        <TabsTrigger className="data-[state=active]:bg-gray-100" value="music">
          Music
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-gray-100"
          value="podcasts"
        >
          Podcasts
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-gray-100"
          value="audiobooks"
        >
          Audiobooks
        </TabsTrigger>
      </TabsList>
      <TabsContent value="music">
        <p className="text-sm text-gray-600">
          Your music library appears here.
        </p>
      </TabsContent>
      <TabsContent value="podcasts">
        <p className="text-sm text-gray-600">
          Your podcast subscriptions appear here.
        </p>
      </TabsContent>
      <TabsContent value="audiobooks">
        <p className="text-sm text-gray-600">
          Your audiobook collection appears here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

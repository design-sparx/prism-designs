import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@prism/react/tabs";
import { Button } from "@prism/react/button";
import { Input } from "@prism/react/input";

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
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Account</h3>
            <p className="text-sm text-gray-500">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input defaultValue="@peduarte" />
          </div>
          <Button>Save changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Password</h3>
            <p className="text-sm text-gray-500">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New password</label>
            <Input type="password" />
          </div>
          <Button>Save password</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Overview Dashboard</h3>
          <p className="text-sm text-gray-500">
            View a summary of your account activity and key metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-semibold">Analytics</h3>
          <p className="text-sm text-gray-500">
            Deep dive into your data with detailed charts and insights.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
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
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
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
      defaultValue="general"
      orientation="vertical"
      className="flex w-[600px] gap-4"
    >
      <TabsList className="flex h-auto flex-col items-stretch">
        <TabsTrigger value="general" className="justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="justify-start">
          Security
        </TabsTrigger>
        <TabsTrigger value="integrations" className="justify-start">
          Integrations
        </TabsTrigger>
        <TabsTrigger value="advanced" className="justify-start">
          Advanced
        </TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="general" className="mt-0">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">General Settings</h3>
            <p className="text-sm text-gray-500">
              Configure your general application preferences and defaults.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-0">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">Security Settings</h3>
            <p className="text-sm text-gray-500">
              Manage your security preferences and authentication methods.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="integrations" className="mt-0">
          <div className="rounded-md border p-4">
            <h3 className="mb-2 font-semibold">Integrations</h3>
            <p className="text-sm text-gray-500">
              Connect and configure third-party integrations and services.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="mt-0">
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
    <Tabs defaultValue="music" className="w-[400px]">
      <TabsList className="w-full justify-start bg-transparent">
        <TabsTrigger value="music" className="data-[state=active]:bg-gray-100">
          Music
        </TabsTrigger>
        <TabsTrigger
          value="podcasts"
          className="data-[state=active]:bg-gray-100"
        >
          Podcasts
        </TabsTrigger>
        <TabsTrigger
          value="audiobooks"
          className="data-[state=active]:bg-gray-100"
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

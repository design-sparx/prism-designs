/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook demo code uses setState callbacks which TypeScript marks as 'any' */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Storybook demo code with typed state objects */
/* eslint-disable @typescript-eslint/no-unsafe-return -- Storybook demo code with callbacks */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@prism/react/label";
import { Switch } from "@prism/react/switch";

/**
 * Switch Component Stories
 *
 * Showcases the Prism Switch component - a toggle control for binary on/off states.
 *
 * Educational notes:
 * - Built on Radix UI primitives for accessibility
 * - Supports both controlled and uncontrolled modes
 * - Always pair with a Label for better accessibility
 * - Common use cases: settings, preferences, feature toggles
 */

const meta: Meta<typeof Switch> = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Switch",
};

export default meta;
type Story = StoryObj<typeof Switch>;

/**
 * Default Switch
 *
 * A basic switch in its unchecked state.
 */
export const Default: Story = {
  render: () => <Switch />,
};

/**
 * With Label
 *
 * Switch paired with a label for better accessibility.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

/**
 * Default Checked
 *
 * Switch with initial checked state (uncontrolled mode).
 */
export const DefaultChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch defaultChecked id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};

/**
 * Disabled
 *
 * A disabled switch that cannot be toggled.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch disabled id="disabled-off" />
        <Label disabled htmlFor="disabled-off">
          Disabled (Off)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch defaultChecked disabled id="disabled-on" />
        <Label disabled htmlFor="disabled-on">
          Disabled (On)
        </Label>
      </div>
    </div>
  ),
};

/**
 * Controlled Mode
 *
 * Demonstrates controlled mode with React state.
 * The switch state is managed by the parent component.
 */
function ControlledSwitchExample(): JSX.Element {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={checked}
          id="controlled-switch"
          onCheckedChange={setChecked}
        />
        <Label htmlFor="controlled-switch">Wi-Fi</Label>
      </div>
      <p className="text-sm text-neutral-600">
        Status: <span className="font-medium">{checked ? "On" : "Off"}</span>
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSwitchExample />,
};

/**
 * Multiple Switches
 *
 * A group of switches for different settings.
 */
function MultipleSwitchesExample(): JSX.Element {
  const [settings, setSettings] = useState({
    bluetooth: false,
    darkMode: true,
    notifications: true,
    wifi: false,
  });

  return (
    <div className="w-80 space-y-4">
      <h3 className="text-lg font-semibold">Settings</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="wifi-switch">Wi-Fi</Label>
          <Switch
            checked={settings.wifi}
            id="wifi-switch"
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, wifi: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="bluetooth-switch">Bluetooth</Label>
          <Switch
            checked={settings.bluetooth}
            id="bluetooth-switch"
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, bluetooth: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications-switch">Notifications</Label>
          <Switch
            checked={settings.notifications}
            id="notifications-switch"
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, notifications: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode-switch">Dark Mode</Label>
          <Switch
            checked={settings.darkMode}
            id="dark-mode-switch"
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, darkMode: checked }))
            }
          />
        </div>
      </div>
    </div>
  );
}

export const MultipleSwitches: Story = {
  render: () => <MultipleSwitchesExample />,
};

/**
 * With Description
 *
 * Switch with a label and helper text.
 */
export const WithDescription: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="marketing-emails" />
      <div className="grid gap-1.5 leading-none">
        <Label className="cursor-pointer" htmlFor="marketing-emails">
          Marketing emails
        </Label>
        <p className="text-sm text-neutral-500">
          Receive emails about new products and features
        </p>
      </div>
    </div>
  ),
};

/**
 * Form Example
 *
 * Switch used in a form with multiple options.
 */
interface PreferencesForm {
  emailNotifications: boolean;
  marketing: boolean;
  pushNotifications: boolean;
  securityAlerts: boolean;
}

function FormExample(): JSX.Element {
  const [preferences, setPreferences] = useState<PreferencesForm>({
    emailNotifications: true,
    marketing: false,
    pushNotifications: true,
    securityAlerts: true,
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // eslint-disable-next-line no-console -- Demo purposes
    console.log("Preferences saved:", preferences);
  };

  return (
    <form className="w-96 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>

        <div className="space-y-4 rounded-lg border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-neutral-500">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              id="email-notifications"
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  emailNotifications: checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-neutral-500">
                Receive push notifications on your device
              </p>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              id="push-notifications"
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  pushNotifications: checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-neutral-500">
                Important security updates and alerts
              </p>
            </div>
            <Switch
              checked={preferences.securityAlerts}
              id="security-alerts"
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({
                  ...prev,
                  securityAlerts: checked,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing">Marketing Communications</Label>
              <p className="text-sm text-neutral-500">
                Promotional content and special offers
              </p>
            </div>
            <Switch
              checked={preferences.marketing}
              id="marketing"
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, marketing: checked }))
              }
            />
          </div>
        </div>
      </div>

      <button
        className="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 text-white"
        type="submit"
      >
        Save Preferences
      </button>
    </form>
  );
}

export const Form: Story = {
  render: () => <FormExample />,
};

/**
 * Vertical Layout
 *
 * Switches stacked vertically.
 */
export const VerticalLayout: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Switch defaultChecked id="setting-1" />
        <Label htmlFor="setting-1">Enable feature A</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="setting-2" />
        <Label htmlFor="setting-2">Enable feature B</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="setting-3" />
        <Label htmlFor="setting-3">Enable feature C</Label>
      </div>
    </div>
  ),
};

/**
 * With Icons
 *
 * Switches with icons for visual context.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <Label className="cursor-pointer" htmlFor="wifi-icon">
              Wi-Fi
            </Label>
            <p className="text-sm text-neutral-500">Connect to network</p>
          </div>
        </div>
        <Switch id="wifi-icon" />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <svg
              className="h-5 w-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <Label className="cursor-pointer" htmlFor="notifications-icon">
              Notifications
            </Label>
            <p className="text-sm text-neutral-500">Get app notifications</p>
          </div>
        </div>
        <Switch defaultChecked id="notifications-icon" />
      </div>
    </div>
  ),
};

/* eslint-disable -- Documentation file displaying design tokens, strict linting not required for visual examples */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@prism/react/button";
import { transitions } from "@prism/tokens";

/**
 * Transition Tokens
 *
 * Animation timing and easing values for smooth, consistent interactions.
 */

const meta: Meta = {
  title: "Theme/Transitions",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * Transition Durations
 *
 * Speed of animations from fast to slower.
 */
export const Durations: Story = {
  render: function DurationsDemo() {
    const [active, setActive] = useState<string | null>(null);

    return (
      <div className="space-y-6">
        {Object.entries(transitions.duration).map(([key, value]) => (
          <div key={key}>
            <div className="mb-2 flex items-center gap-4">
              <span className="w-24 font-mono text-sm font-semibold text-neutral-900">
                {key}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {value}
              </span>
              <Button
                onClick={() => setActive(active === key ? null : key)}
                size="sm"
                variant="outline"
              >
                {active === key ? "Reset" : "Animate"}
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 p-4">
              <div
                className="bg-primary-500 h-16 w-16 rounded-lg transition-transform"
                style={{
                  transitionDuration: value,
                  transform:
                    active === key ? "translateX(200px)" : "translateX(0)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Timing Functions (Easing)
 *
 * How animations accelerate and decelerate.
 */
export const TimingFunctions: Story = {
  render: function TimingDemo() {
    const [active, setActive] = useState<string | null>(null);

    return (
      <div className="space-y-6">
        {Object.entries(transitions.timing).map(([key, value]) => (
          <div key={key}>
            <div className="mb-2 flex items-center gap-4">
              <span className="w-32 font-mono text-sm font-semibold text-neutral-900">
                {key}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {value}
              </span>
              <Button
                onClick={() => setActive(active === key ? null : key)}
                size="sm"
                variant="outline"
              >
                {active === key ? "Reset" : "Animate"}
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 p-4">
              <div
                className="bg-primary-500 h-16 w-16 rounded-lg"
                style={{
                  transition: `transform 1s ${value}`,
                  transform:
                    active === key ? "translateX(300px)" : "translateX(0)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Interactive Examples
 *
 * Common transition patterns in action.
 */
export const Examples: Story = {
  render: function ExamplesDemo() {
    const [_hovered, setHovered] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Hover States (fast)</h3>
          <div className="flex gap-4">
            <button
              className="duration-fast rounded-lg border-2 border-neutral-300 bg-white px-6 py-3 transition-colors hover:bg-neutral-100"
              onMouseEnter={() => setHovered("bg")}
              onMouseLeave={() => setHovered(null)}
              type="button"
            >
              Hover me
            </button>
            <button
              className="border-primary-500 bg-primary-500 duration-fast rounded-lg border-2 px-6 py-3 text-white transition-transform hover:scale-105"
              type="button"
            >
              Scale on hover
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Color Transitions (base)
          </h3>
          <div
            className="bg-primary-500 duration-base hover:bg-primary-600 inline-block cursor-pointer rounded-lg px-8 py-4 text-white transition-colors"
            onMouseEnter={() => setHovered("color")}
            onMouseLeave={() => setHovered(null)}
          >
            Hover for color change
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Expandable Panel (slow)
          </h3>
          <div className="rounded-lg border border-neutral-300 bg-white">
            <button
              className="w-full px-6 py-4 text-left font-semibold hover:bg-neutral-50"
              onClick={() => setExpanded(!expanded)}
              type="button"
            >
              {expanded ? "Collapse" : "Expand"} Panel
            </button>
            <div
              className="duration-slow overflow-hidden transition-all"
              style={{ maxHeight: expanded ? "200px" : "0" }}
            >
              <div className="border-t border-neutral-300 px-6 py-4">
                <p className="text-sm text-neutral-600">
                  This content expands and collapses smoothly using the
                  &apos;slow&apos; duration (300ms).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Shadow Transitions</h3>
          <div className="duration-base inline-block cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
            <p className="text-sm">Hover for shadow change</p>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Easing Comparison
 *
 * Side-by-side comparison of different easing functions.
 */
export const EasingComparison: Story = {
  render: function EasingComparisonDemo() {
    const [animate, setAnimate] = useState(false);

    return (
      <div className="space-y-4">
        <Button onClick={() => setAnimate(!animate)}>
          {animate ? "Reset" : "Animate All"}
        </Button>

        <div className="space-y-4">
          <div>
            <span className="mb-2 block font-mono text-sm">linear</span>
            <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 p-4">
              <div
                className="bg-primary-500 h-12 w-12 rounded"
                style={{
                  transition: "transform 2s linear",
                  transform: animate ? "translateX(400px)" : "translateX(0)",
                }}
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block font-mono text-sm">ease-in</span>
            <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 p-4">
              <div
                className="bg-primary-500 h-12 w-12 rounded"
                style={{
                  transition: `transform 2s ${transitions.timing["ease-in"]}`,
                  transform: animate ? "translateX(400px)" : "translateX(0)",
                }}
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block font-mono text-sm">ease-out</span>
            <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 p-4">
              <div
                className="bg-primary-500 h-12 w-12 rounded"
                style={{
                  transition: `transform 2s ${transitions.timing["ease-out"]}`,
                  transform: animate ? "translateX(400px)" : "translateX(0)",
                }}
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block font-mono text-sm">ease-in-out</span>
            <div className="overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 p-4">
              <div
                className="bg-primary-500 h-12 w-12 rounded"
                style={{
                  transition: `transform 2s ${transitions.timing["ease-in-out"]}`,
                  transform: animate ? "translateX(400px)" : "translateX(0)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

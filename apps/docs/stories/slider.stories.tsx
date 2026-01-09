import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@prism/react/slider";

/**
 * Slider Component Stories
 *
 * Showcases the Prism Slider component in various configurations.
 * Sliders allow users to select a value from within a given range.
 */

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: "object",
      description: "Default value(s) for uncontrolled slider",
    },
    min: {
      control: "number",
      description: "Minimum value",
    },
    max: {
      control: "number",
      description: "Maximum value",
    },
    step: {
      control: "number",
      description: "Increment/decrement step",
    },
    disabled: {
      control: "boolean",
      description: "Whether the slider is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

/**
 * Default Slider
 *
 * Basic slider with a single thumb starting at 50
 */
export const Default: Story = {
  args: {
    defaultValue: [50],
    className: "w-[300px]",
  },
};

/**
 * Custom Range
 *
 * Slider with custom min and max values (0-200)
 */
export const CustomRange: Story = {
  args: {
    defaultValue: [100],
    min: 0,
    max: 200,
    className: "w-[300px]",
  },
};

/**
 * With Step
 *
 * Slider that increments/decrements by 10
 */
export const WithStep: Story = {
  args: {
    defaultValue: [50],
    step: 10,
    className: "w-[300px]",
  },
};

/**
 * Small Step
 *
 * Slider with decimal step for precise control
 */
export const SmallStep: Story = {
  args: {
    defaultValue: [0.5],
    min: 0,
    max: 1,
    step: 0.1,
    className: "w-[300px]",
  },
};

/**
 * Range Slider
 *
 * Slider with two thumbs for selecting a range
 */
export const RangeSlider: Story = {
  args: {
    defaultValue: [25, 75],
    className: "w-[300px]",
  },
};

/**
 * Disabled
 *
 * Non-interactive slider in disabled state
 */
export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
    className: "w-[300px]",
  },
};

/**
 * Different Widths
 *
 * Sliders at various widths to show responsive behavior
 */
export const DifferentWidths: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Small (200px)
        </div>
        <Slider className="w-[200px]" defaultValue={[50]} />
      </div>
      <div>
        <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Medium (400px)
        </div>
        <Slider className="w-[400px]" defaultValue={[50]} />
      </div>
      <div>
        <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
          Large (600px)
        </div>
        <Slider className="w-[600px]" defaultValue={[50]} />
      </div>
    </div>
  ),
};

/**
 * Controlled Slider
 *
 * Slider with controlled value showing current selection
 */
export const Controlled: Story = {
  render: function ControlledRender() {
    const [value, setValue] = useState([50]);

    return (
      <div style={{ width: "400px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>Value:</span>
          <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
            {value[0]}
          </span>
        </div>
        <Slider onValueChange={setValue} value={value} />
      </div>
    );
  },
};

/**
 * Volume Control Example
 *
 * Real-world example: audio volume slider (0-100)
 */
export const VolumeControl: Story = {
  render: function VolumeControlRender() {
    const [volume, setVolume] = useState([70]);

    return (
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Volume</span>
          <span
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginLeft: "auto",
            }}
          >
            {volume[0]}%
          </span>
        </div>
        <Slider
          aria-label="Volume control"
          onValueChange={setVolume}
          value={volume}
        />
      </div>
    );
  },
};

/**
 * Price Range Filter
 *
 * Real-world example: price range selector for filtering
 */
export const PriceRangeFilter: Story = {
  render: function PriceRangeFilterRender() {
    const [priceRange, setPriceRange] = useState([25, 75]);

    return (
      <div style={{ width: "400px" }}>
        <div style={{ marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Price Range
          </span>
        </div>
        <Slider
          aria-label="Price range filter"
          max={100}
          min={0}
          onValueChange={setPriceRange}
          step={5}
          value={priceRange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    );
  },
};

/**
 * Brightness Control
 *
 * Real-world example: screen brightness (0-100)
 */
export const BrightnessControl: Story = {
  render: function BrightnessControlRender() {
    const [brightness, setBrightness] = useState([80]);

    return (
      <div style={{ width: "350px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
            Brightness
          </span>
          <div
            style={{
              marginLeft: "auto",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "4px",
                background: `linear-gradient(to right, #e5e7eb ${100 - brightness[0]}%, #3b82f6 ${100 - brightness[0]}%)`,
                borderRadius: "2px",
              }}
            />
            <span>{brightness[0]}%</span>
          </div>
        </div>
        <Slider
          aria-label="Brightness control"
          onValueChange={setBrightness}
          value={brightness}
        />
      </div>
    );
  },
};

/**
 * With Labels
 *
 * Slider with min/max labels for better context
 */
export const WithLabels: Story = {
  render: () => (
    <div style={{ width: "400px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          fontSize: "0.75rem",
          color: "#6b7280",
        }}
      >
        <span>Min (0)</span>
        <span>Max (100)</span>
      </div>
      <Slider defaultValue={[50]} />
      <div
        style={{
          textAlign: "center",
          marginTop: "0.5rem",
          fontSize: "0.875rem",
        }}
      >
        Current: 50
      </div>
    </div>
  ),
};

/**
 * Multiple Sliders
 *
 * Multiple sliders for different settings
 */
export const MultipleSliders: Story = {
  render: function MultipleSlidersRender() {
    const [red, setRed] = useState([255]);
    const [green, setGreen] = useState([100]);
    const [blue, setBlue] = useState([50]);

    const color = `rgb(${red[0]}, ${green[0]}, ${blue[0]})`;

    return (
      <div style={{ width: "400px" }}>
        <div
          style={{
            height: "100px",
            backgroundColor: color,
            borderRadius: "0.5rem",
            marginBottom: "1.5rem",
            border: "1px solid #e5e7eb",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#ef4444" }}>
                Red
              </span>
              <span style={{ fontSize: "0.875rem" }}>{red[0]}</span>
            </div>
            <Slider
              aria-label="Red color value"
              max={255}
              min={0}
              onValueChange={setRed}
              value={red}
            />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#10b981" }}>
                Green
              </span>
              <span style={{ fontSize: "0.875rem" }}>{green[0]}</span>
            </div>
            <Slider
              aria-label="Green color value"
              max={255}
              min={0}
              onValueChange={setGreen}
              value={green}
            />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.875rem", color: "#3b82f6" }}>
                Blue
              </span>
              <span style={{ fontSize: "0.875rem" }}>{blue[0]}</span>
            </div>
            <Slider
              aria-label="Blue color value"
              max={255}
              min={0}
              onValueChange={setBlue}
              value={blue}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "0.75rem",
            color: "#6b7280",
            fontFamily: "monospace",
          }}
        >
          {color}
        </div>
      </div>
    );
  },
};

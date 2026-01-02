/* eslint-disable react-hooks/rules-of-hooks -- Storybook render functions require hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook typing issue */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook typing issue */
/* eslint-disable @typescript-eslint/no-unsafe-member-access -- Storybook typing issue */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "@prism/react/calendar";

/**
 * Calendar component for date selection.
 *
 * Built on top of react-day-picker, providing a flexible foundation
 * for date-related components like DatePicker and DateRangePicker.
 *
 * ## Features
 * - Single date selection
 * - Multiple date selection
 * - Date range selection
 * - Keyboard navigation
 * - Customizable styling
 * - Date constraints (min/max dates, disabled dates)
 *
 * ## Usage
 * The Calendar component is typically used inside other components
 * (like DatePicker) but can be used standalone for custom implementations.
 */
const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default calendar without any selection
 */
export const Default: Story = {
  args: {},
};

/**
 * Single date selection mode
 *
 * Allows users to select a single date.
 */
export const SingleMode: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return <Calendar mode="single" onSelect={setDate} selected={date} />;
  },
};

/**
 * Calendar with a pre-selected date
 */
export const WithDefaultDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 3, 15)); // April 15, 2024
    return <Calendar mode="single" onSelect={setDate} selected={date} />;
  },
};

/**
 * Multiple date selection mode
 *
 * Allows users to select multiple dates.
 * Click dates to toggle selection.
 */
export const MultipleMode: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[]>([]);
    return (
      <div className="space-y-4">
        <Calendar mode="multiple" onSelect={setDates} selected={dates} />
        <div className="text-sm text-neutral-600">
          Selected {dates.length} date{dates.length !== 1 ? "s" : ""}
        </div>
      </div>
    );
  },
};

/**
 * Date range selection mode
 *
 * Allows users to select a start and end date.
 */
export const RangeMode: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>();
    return (
      <div className="space-y-4">
        <Calendar mode="range" onSelect={setRange} selected={range} />
        {range?.from ? (
          <div className="text-sm text-neutral-600">
            {range.to
              ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
              : `From ${range.from.toLocaleDateString()}`}
          </div>
        ) : null}
      </div>
    );
  },
};

/**
 * Calendar with disabled dates
 *
 * Prevents selection of specific dates or date ranges.
 */
export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();

    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">Past dates are disabled</p>
        <Calendar
          disabled={{ before: today }}
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </div>
    );
  },
};

/**
 * Calendar without outside days
 *
 * Hides days from previous and next months.
 */
export const WithoutOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <Calendar
        mode="single"
        onSelect={setDate}
        selected={date}
        showOutsideDays={false}
      />
    );
  },
};

/**
 * Calendar with specific month displayed
 */
export const SpecificMonth: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const januaryDate = new Date(2024, 0, 1); // January 2024

    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">Displaying January 2024</p>
        <Calendar
          defaultMonth={januaryDate}
          mode="single"
          onSelect={setDate}
          selected={date}
        />
      </div>
    );
  },
};

/**
 * Calendar with custom styling
 */
export const CustomStyling: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <Calendar
        className="rounded-lg border shadow-lg"
        mode="single"
        onSelect={setDate}
        selected={date}
      />
    );
  },
};

/**
 * Calendar with weekday names shown
 *
 * This is the default behavior, showing day abbreviations.
 */
export const WithWeekdays: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return <Calendar mode="single" onSelect={setDate} selected={date} />;
  },
};

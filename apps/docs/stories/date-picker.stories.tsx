/* eslint-disable react-hooks/rules-of-hooks -- Storybook render functions require hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Storybook typing issue */
/* eslint-disable @typescript-eslint/no-unsafe-call -- Storybook typing issue */
/* eslint-disable jsx-a11y/label-has-associated-control -- Story example labels */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "@prism/react/date-picker";

/**
 * DatePicker provides an accessible, user-friendly interface for date selection.
 *
 * Built by composing the Calendar and Popover components, it demonstrates
 * how to create complex components from simpler building blocks.
 *
 * ## Features
 * - Keyboard accessible (Tab, Enter, Escape)
 * - Customizable date format
 * - Placeholder text support
 * - Date range constraints (min/max dates)
 * - Controlled component pattern
 */
const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default date picker with placeholder text
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

/**
 * Date picker with a pre-selected date
 */
export const WithDefaultDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 3, 15)); // April 15, 2024
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

/**
 * Custom placeholder text
 */
export const CustomPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Select your birthday"
      />
    );
  },
};

/**
 * Custom date format using date-fns format tokens
 *
 * Common formats:
 * - 'PPP': Apr 29, 2024 (default)
 * - 'yyyy-MM-dd': 2024-04-29
 * - 'MM/dd/yyyy': 04/29/2024
 * - 'MMMM d, yyyy': April 29, 2024
 */
export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 3, 15));
    return (
      <DatePicker date={date} dateFormat="yyyy-MM-dd" onDateChange={setDate} />
    );
  },
};

/**
 * Disabled date picker
 */
export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date(2024, 3, 15));
    return <DatePicker date={date} disabled onDateChange={setDate} />;
  },
};

/**
 * Date picker with minimum date constraint
 *
 * Prevents selecting dates before a specific date.
 * Useful for booking systems, scheduling, etc.
 */
export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          Cannot select dates before today
        </p>
        <DatePicker
          date={date}
          fromDate={today}
          onDateChange={setDate}
          placeholder="Select a future date"
        />
      </div>
    );
  },
};

/**
 * Date picker with maximum date constraint
 *
 * Prevents selecting dates after a specific date.
 */
export const WithMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          Cannot select dates after today
        </p>
        <DatePicker
          date={date}
          onDateChange={setDate}
          placeholder="Select a past date"
          toDate={today}
        />
      </div>
    );
  },
};

/**
 * Date picker with date range constraints
 *
 * Restricts selection to dates within a specific range.
 */
export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(
      today.getTime() + 30 * 24 * 60 * 60 * 1000,
    );

    return (
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">
          Select a date between {oneWeekFromNow.toLocaleDateString()} and{" "}
          {oneMonthFromNow.toLocaleDateString()}
        </p>
        <DatePicker
          date={date}
          fromDate={oneWeekFromNow}
          onDateChange={setDate}
          placeholder="Select within range"
          toDate={oneMonthFromNow}
        />
      </div>
    );
  },
};

/**
 * Custom width using className
 */
export const CustomWidth: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <DatePicker className="w-[400px]" date={date} onDateChange={setDate} />
    );
  },
};

/**
 * Multiple date pickers in a form
 */
export const InForm: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    return (
      <div className="w-[400px] space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Start Date</label>
          <DatePicker
            date={startDate}
            onDateChange={setStartDate}
            placeholder="Pick start date"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">End Date</label>
          <DatePicker
            date={endDate}
            fromDate={startDate}
            onDateChange={setEndDate}
            placeholder="Pick end date"
          />
        </div>
      </div>
    );
  },
};

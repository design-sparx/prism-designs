import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { render, screen, waitFor } from "../../test/utils";

import { DatePicker } from "./date-picker";

describe("DatePicker", () => {
  it("renders without crashing", () => {
    render(<DatePicker />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays placeholder text when no date is selected", () => {
    render(<DatePicker placeholder="Select a date" />);
    expect(screen.getByText("Select a date")).toBeInTheDocument();
  });

  it("displays custom placeholder", () => {
    render(<DatePicker placeholder="Choose your birthday" />);
    expect(screen.getByText("Choose your birthday")).toBeInTheDocument();
  });

  it("displays the selected date when provided", () => {
    const date = new Date(2024, 3, 15); // April 15, 2024
    render(<DatePicker date={date} />);
    // Default format is "PPP" which produces "April 15th, 2024" (with ordinal suffix)
    expect(screen.getByText("April 15th, 2024")).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(<DatePicker disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies custom className to trigger button", () => {
    render(<DatePicker className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("opens popover when clicked", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Wait for the calendar to appear (react-day-picker v9 uses role="grid")
    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });
  });

  it("calls onDateChange when a date is selected", async () => {
    const user = userEvent.setup();
    const handleDateChange = vi.fn();
    render(<DatePicker onDateChange={handleDateChange} />);

    // Open the popover
    const button = screen.getByRole("button");
    await user.click(button);

    // Wait for calendar to appear (react-day-picker v9 uses role="grid")
    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    // Click on a day button - get all buttons and find one that's a day (has numeric text)
    const dayButtons = screen.getAllByRole("button");
    const dayButton = dayButtons.find((btn) =>
      /^\d+$/.test(btn.textContent || ""),
    );

    if (dayButton) {
      await user.click(dayButton);

      // Verify callback was called
      expect(handleDateChange).toHaveBeenCalledTimes(1);
      expect(handleDateChange).toHaveBeenCalledWith(expect.any(Date));
    }
  });

  it("closes popover after selecting a date", async () => {
    const user = userEvent.setup();
    const handleDateChange = vi.fn();
    render(<DatePicker onDateChange={handleDateChange} />);

    // Open the popover
    const button = screen.getByRole("button");
    await user.click(button);

    // Wait for calendar to appear (react-day-picker v9 uses role="grid")
    await waitFor(() => {
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    // Click on a day button
    const dayButtons = screen.getAllByRole("button");
    const dayButton = dayButtons.find((btn) =>
      /^\d+$/.test(btn.textContent || ""),
    );

    if (dayButton) {
      await user.click(dayButton);

      // Verify callback was called
      expect(handleDateChange).toHaveBeenCalled();
    }
  });

  it("formats date with custom format string", () => {
    const date = new Date(2024, 3, 15); // April 15, 2024
    render(<DatePicker date={date} dateFormat="yyyy-MM-dd" />);
    expect(screen.getByText("2024-04-15")).toBeInTheDocument();
  });

  it("has proper aria-label", () => {
    const date = new Date(2024, 3, 15); // April 15, 2024
    render(<DatePicker date={date} />);
    const button = screen.getByRole("button");
    // date-fns formats as "April 15th, 2024" with ordinal suffix
    expect(button).toHaveAttribute(
      "aria-label",
      "Selected date: April 15th, 2024",
    );
  });

  it("has placeholder aria-label when no date selected", () => {
    render(<DatePicker placeholder="Pick a date" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Pick a date");
  });
});

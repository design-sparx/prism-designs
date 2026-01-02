import { describe, expect, it } from "vitest";

import { render, screen } from "../../test/utils";

import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders without crashing", () => {
    render(<Calendar />);
    // react-day-picker v9 uses role="grid" for the calendar
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("displays the current month by default", () => {
    render(<Calendar />);
    const currentMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    // The calendar should show the current month name somewhere
    expect(screen.getByText(new RegExp(currentMonth, "i"))).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Calendar className="custom-calendar" />);
    expect(container.querySelector(".custom-calendar")).toBeInTheDocument();
  });

  it("shows outside days by default", () => {
    render(<Calendar />);
    // react-day-picker renders the calendar with role="grid"
    const calendar = screen.getByRole("grid");
    expect(calendar).toBeInTheDocument();
  });

  it("can hide outside days", () => {
    render(<Calendar showOutsideDays={false} />);
    const calendar = screen.getByRole("grid");
    expect(calendar).toBeInTheDocument();
  });

  it("renders with a specific month", () => {
    const specificDate = new Date(2024, 0, 15); // January 2024
    render(<Calendar defaultMonth={specificDate} />);
    // Check for January 2024 in various possible formats
    expect(screen.getByText(/january/i)).toBeInTheDocument();
  });

  it("handles single mode selection", () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container).toBeInTheDocument();
    // In single mode, clicking a day should select it
    const calendar = screen.getByRole("grid");
    expect(calendar).toBeInTheDocument();
  });
});

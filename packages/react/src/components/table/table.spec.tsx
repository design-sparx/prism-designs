import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

describe("Table", () => {
  describe("Table (root)", () => {
    it("should render a table element", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Table className="custom-table">
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const table = screen.getByRole("table");
      expect(table).toHaveClass("custom-table");
    });

    it("should forward ref to table element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableElement>;
      render(
        <Table ref={ref}>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableElement);
    });

    it("should have overflow wrapper for responsiveness", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const wrapper = container.querySelector(".overflow-auto");
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("TableHeader", () => {
    it("should render a thead element", () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const thead = container.querySelector("thead");
      expect(thead).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Table>
          <TableHeader className="custom-header">
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const thead = container.querySelector("thead");
      expect(thead).toHaveClass("custom-header");
    });

    it("should forward ref to thead element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableSectionElement>;
      render(
        <Table>
          <TableHeader ref={ref}>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
      expect(ref.current?.tagName).toBe("THEAD");
    });
  });

  describe("TableBody", () => {
    it("should render a tbody element", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const tbody = container.querySelector("tbody");
      expect(tbody).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Table>
          <TableBody className="custom-body">
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const tbody = container.querySelector("tbody");
      expect(tbody).toHaveClass("custom-body");
    });

    it("should forward ref to tbody element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableSectionElement>;
      render(
        <Table>
          <TableBody ref={ref}>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
      expect(ref.current?.tagName).toBe("TBODY");
    });
  });

  describe("TableFooter", () => {
    it("should render a tfoot element", () => {
      const { container } = render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      const tfoot = container.querySelector("tfoot");
      expect(tfoot).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Table>
          <TableFooter className="custom-footer">
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      const tfoot = container.querySelector("tfoot");
      expect(tfoot).toHaveClass("custom-footer");
    });

    it("should forward ref to tfoot element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableSectionElement>;
      render(
        <Table>
          <TableFooter ref={ref}>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
      expect(ref.current?.tagName).toBe("TFOOT");
    });
  });

  describe("TableRow", () => {
    it("should render a tr element", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = container.querySelector("tr");
      expect(row).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow className="custom-row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = container.querySelector("tr");
      expect(row).toHaveClass("custom-row");
    });

    it("should forward ref to tr element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableRowElement>;
      render(
        <Table>
          <TableBody>
            <TableRow ref={ref}>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
    });

    it("should support data-state attribute for selection", () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const row = container.querySelector("tr");
      expect(row).toHaveAttribute("data-state", "selected");
    });
  });

  describe("TableHead", () => {
    it("should render a th element", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const header = screen.getByRole("columnheader", {
        name: "Column Header",
      });
      expect(header).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="custom-head">Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const header = screen.getByRole("columnheader");
      expect(header).toHaveClass("custom-head");
    });

    it("should forward ref to th element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableCellElement>;
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead ref={ref}>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current?.tagName).toBe("TH");
    });

    it("should support scope attribute for accessibility", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>,
      );

      const header = screen.getByRole("columnheader");
      expect(header).toHaveAttribute("scope", "col");
    });
  });

  describe("TableCell", () => {
    it("should render a td element", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = screen.getByRole("cell", { name: "Cell Content" });
      expect(cell).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="custom-cell">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = screen.getByRole("cell");
      expect(cell).toHaveClass("custom-cell");
    });

    it("should forward ref to td element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableCellElement>;
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell ref={ref}>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current?.tagName).toBe("TD");
    });

    it("should support colSpan attribute", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Spanning Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = screen.getByRole("cell");
      expect(cell).toHaveAttribute("colSpan", "2");
    });

    it("should support rowSpan attribute", () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={2}>Spanning Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const cell = screen.getByRole("cell");
      expect(cell).toHaveAttribute("rowSpan", "2");
    });
  });

  describe("TableCaption", () => {
    it("should render a caption element", () => {
      const { container } = render(
        <Table>
          <TableCaption>Table Description</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const caption = container.querySelector("caption");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveTextContent("Table Description");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Table>
          <TableCaption className="custom-caption">Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const caption = container.querySelector("caption");
      expect(caption).toHaveClass("custom-caption");
    });

    it("should forward ref to caption element", () => {
      const ref = { current: null } as React.RefObject<HTMLTableCaptionElement>;
      render(
        <Table>
          <TableCaption ref={ref}>Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      expect(ref.current).toBeInstanceOf(HTMLTableCaptionElement);
    });
  });

  describe("Complete Table Structure", () => {
    it("should render a complete table with all parts", () => {
      render(
        <Table>
          <TableCaption>A list of invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV002</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>$400.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>,
      );

      expect(screen.getByRole("table")).toBeInTheDocument();
      expect(screen.getAllByRole("columnheader")).toHaveLength(3);
      expect(screen.getAllByRole("row")).toHaveLength(4); // 1 header + 2 body + 1 footer
      expect(screen.getByText("A list of invoices")).toBeInTheDocument();
    });

    it("should support text alignment customization", () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-right">$100</TableCell>
            </TableRow>
          </TableBody>
        </Table>,
      );

      const header = screen.getByRole("columnheader");
      const cell = screen.getByRole("cell");

      expect(header).toHaveClass("text-right");
      expect(cell).toHaveClass("text-right");
    });
  });
});

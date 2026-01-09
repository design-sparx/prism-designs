import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@prism/react/table";

/**
 * The Table component is a semantic HTML table for displaying structured data.
 * It uses a composition pattern with individual sub-components for maximum flexibility.
 *
 * ## Features
 * - Semantic HTML elements for accessibility
 * - Responsive with horizontal scrolling
 * - Customizable via className
 * - Supports all standard table HTML attributes
 *
 * ## Sub-components
 * - `Table` - Root wrapper
 * - `TableHeader` - Header section (`<thead>`)
 * - `TableBody` - Body section (`<tbody>`)
 * - `TableFooter` - Footer section (`<tfoot>`)
 * - `TableRow` - Row (`<tr>`)
 * - `TableHead` - Header cell (`<th>`)
 * - `TableCell` - Data cell (`<td>`)
 * - `TableCaption` - Caption (`<caption>`)
 */
const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A basic table showing invoice data with header, body, and caption.
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV004</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV005</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$550.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV006</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>Bank Transfer</TableCell>
          <TableCell className="text-right">$200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV007</TableCell>
          <TableCell>Unpaid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$300.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table with a footer showing totals or summary information.
 */
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>Monthly sales report.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Units Sold</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Product A</TableCell>
          <TableCell>120</TableCell>
          <TableCell className="text-right">$2,400.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Product B</TableCell>
          <TableCell>85</TableCell>
          <TableCell className="text-right">$1,700.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Product C</TableCell>
          <TableCell>200</TableCell>
          <TableCell className="text-right">$4,000.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right font-bold">$8,100.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * Minimal table without caption showing user data.
 */
export const WithoutCaption: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Alice Johnson</TableCell>
          <TableCell>alice@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Bob Smith</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Carol White</TableCell>
          <TableCell>carol@example.com</TableCell>
          <TableCell>Viewer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table demonstrating column spanning with merged cells.
 */
export const WithColSpan: Story = {
  render: () => (
    <Table>
      <TableCaption>Project timeline with milestones.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Phase</TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="align-top font-medium" rowSpan={2}>
            Planning
          </TableCell>
          <TableCell>Requirements Gathering</TableCell>
          <TableCell>2 weeks</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Design Mockups</TableCell>
          <TableCell>3 weeks</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="align-top font-medium" rowSpan={3}>
            Development
          </TableCell>
          <TableCell>Frontend Development</TableCell>
          <TableCell>6 weeks</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Backend Development</TableCell>
          <TableCell>6 weeks</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Integration</TableCell>
          <TableCell>2 weeks</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Testing</TableCell>
          <TableCell colSpan={2}>Quality assurance and bug fixes</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total Project Duration</TableCell>
          <TableCell className="font-bold">19 weeks</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * Table with custom styling showing status indicators.
 */
export const WithCustomStyling: Story = {
  render: () => (
    <Table>
      <TableCaption>Server status dashboard.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Server</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Uptime</TableHead>
          <TableHead className="text-right">CPU Usage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Web Server 1</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Online
            </span>
          </TableCell>
          <TableCell>99.9%</TableCell>
          <TableCell className="text-right">45%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Web Server 2</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
              Online
            </span>
          </TableCell>
          <TableCell>99.8%</TableCell>
          <TableCell className="text-right">62%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Database Server</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
              Warning
            </span>
          </TableCell>
          <TableCell>98.5%</TableCell>
          <TableCell className="text-right">87%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">API Server</TableCell>
          <TableCell>
            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              Offline
            </span>
          </TableCell>
          <TableCell>0%</TableCell>
          <TableCell className="text-right">0%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Compact table with minimal spacing.
 */
export const Compact: Story = {
  render: () => (
    <Table className="text-xs">
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 px-2">ID</TableHead>
          <TableHead className="h-8 px-2">Name</TableHead>
          <TableHead className="h-8 px-2">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="p-2">1</TableCell>
          <TableCell className="p-2">Item A</TableCell>
          <TableCell className="p-2">$100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="p-2">2</TableCell>
          <TableCell className="p-2">Item B</TableCell>
          <TableCell className="p-2">$200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="p-2">3</TableCell>
          <TableCell className="p-2">Item C</TableCell>
          <TableCell className="p-2">$300</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table with hover effects and striped rows.
 */
export const Striped: Story = {
  render: () => (
    <Table>
      <TableCaption>Employee directory.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Employee ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { id: "E001", name: "John Doe", dept: "Engineering", loc: "NYC" },
          { id: "E002", name: "Jane Smith", dept: "Marketing", loc: "SF" },
          { id: "E003", name: "Mike Johnson", dept: "Sales", loc: "LA" },
          { id: "E004", name: "Sarah Williams", dept: "HR", loc: "NYC" },
          { id: "E005", name: "Tom Brown", dept: "Engineering", loc: "SF" },
        ].map((employee, index) => (
          <TableRow
            className={index % 2 === 0 ? "bg-neutral-50" : ""}
            key={employee.id}
          >
            <TableCell className="font-medium">{employee.id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.dept}</TableCell>
            <TableCell>{employee.loc}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

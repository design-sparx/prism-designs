import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@prism/react/accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion className="w-full max-w-md" collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and supports keyboard
          navigation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that you can customize with Tailwind
          CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. The accordion uses smooth animations for expanding and collapsing
          content.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion className="w-full max-w-md" type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! This accordion uses type=&quot;multiple&quot;, allowing multiple
          sections to be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I enable this?</AccordionTrigger>
        <AccordionContent>
          Simply set the type prop to &quot;multiple&quot; instead of
          &quot;single&quot;.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Any other benefits?</AccordionTrigger>
        <AccordionContent>
          Multiple mode is great for FAQs where users might want to compare
          answers.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion
      className="w-full max-w-md"
      collapsible
      defaultValue="item-2"
      type="single"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>This section starts collapsed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section (Default Open)</AccordionTrigger>
        <AccordionContent>
          This section starts expanded by default.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>This section also starts collapsed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Accordion className="w-full max-w-md" collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Section</AccordionTrigger>
        <AccordionContent>
          This section can be toggled normally.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem disabled value="item-2">
        <AccordionTrigger>Disabled Section</AccordionTrigger>
        <AccordionContent>This content cannot be accessed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Enabled Section</AccordionTrigger>
        <AccordionContent>This section works normally too.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Accordion className="w-full max-w-md" collapsible type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Prism?</AccordionTrigger>
        <AccordionContent>
          Prism is an educational design system built to teach developers how to
          create their own design systems. It prioritizes clarity and learning
          over features, making it perfect for understanding design system
          architecture.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          Prism is built as a monorepo using modern tools like Turborepo,
          TypeScript, and React. It includes packages for design tokens, core
          utilities, and React components. Each component is thoroughly
          documented with educational comments explaining the &quot;why&quot;
          behind architectural decisions. The system uses Radix UI primitives
          for accessibility and Tailwind CSS for styling.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Who should use it?</AccordionTrigger>
        <AccordionContent>
          Prism is ideal for developers who want to learn how to build a design
          system from scratch. Whether you&apos;re creating your first component
          library or looking to understand design system best practices, Prism
          provides clear examples and patterns you can study and adapt.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

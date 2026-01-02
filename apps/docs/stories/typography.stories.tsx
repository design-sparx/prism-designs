import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "@prism/react/typography";

/**
 * Typography Component Stories
 *
 * Demonstrates text hierarchy and styling using the Typography component.
 */

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "blockquote",
        "list",
        "inlineCode",
        "lead",
        "large",
        "small",
        "muted",
      ],
      description: "The typography variant to render",
    },
    as: {
      control: "text",
      description: "Override the default HTML element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

/**
 * H1 - Largest Heading
 */
export const H1: Story = {
  render: () => <Typography variant="h1">The Joke Tax Chronicles</Typography>,
};

/**
 * H2 - Section Heading
 */
export const H2: Story = {
  render: () => <Typography variant="h2">The People of the Kingdom</Typography>,
};

/**
 * H3 - Subsection Heading
 */
export const H3: Story = {
  render: () => <Typography variant="h3">The Joke Tax</Typography>,
};

/**
 * H4 - Smallest Heading
 */
export const H4: Story = {
  render: () => (
    <Typography variant="h4">People stopped telling jokes</Typography>
  ),
};

/**
 * Paragraph
 */
export const Paragraph: Story = {
  render: () => (
    <Typography variant="p">
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </Typography>
  ),
};

/**
 * Blockquote
 */
export const Blockquote: Story = {
  render: () => (
    <Typography variant="blockquote">
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so
      it&apos;s only fair that they should pay for the privilege.&rdquo;
    </Typography>
  ),
};

/**
 * List
 */
export const List: Story = {
  render: () => (
    <Typography variant="list">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </Typography>
  ),
};

/**
 * Inline Code
 */
export const InlineCode: Story = {
  render: () => (
    <Typography variant="p">
      Install dependencies with{" "}
      <Typography variant="inlineCode">npm install</Typography>
    </Typography>
  ),
};

/**
 * Lead Text
 */
export const Lead: Story = {
  render: () => (
    <Typography variant="lead">
      A modal dialog that interrupts the user with important content and expects
      a response.
    </Typography>
  ),
};

/**
 * Large Text
 */
export const Large: Story = {
  render: () => (
    <Typography variant="large">Are you absolutely sure?</Typography>
  ),
};

/**
 * Small Text
 */
export const Small: Story = {
  render: () => <Typography variant="small">Email address</Typography>,
};

/**
 * Muted Text
 */
export const Muted: Story = {
  render: () => (
    <Typography variant="muted">Enter your email address.</Typography>
  ),
};

/**
 * All Heading Levels
 */
export const AllHeadings: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
    </div>
  ),
};

/**
 * All Text Variants
 */
export const AllTextVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="lead">Lead text for introductions</Typography>
      <Typography variant="p">Regular paragraph text</Typography>
      <Typography variant="large">Large emphasized text</Typography>
      <Typography variant="small">Small label text</Typography>
      <Typography variant="muted">Muted secondary text</Typography>
    </div>
  ),
};

/**
 * Complete Article Example
 */
export const Article: Story = {
  render: () => (
    <div style={{ maxWidth: "650px" }}>
      <Typography variant="h1">The Joke Tax Chronicles</Typography>

      <Typography variant="lead">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne.
      </Typography>

      <Typography variant="h2">The King&apos;s Plan</Typography>
      <Typography variant="p">
        The king thought long and hard, and finally came up with{" "}
        <Typography variant="inlineCode">a brilliant plan</Typography>: he would
        tax the jokes in the kingdom.
      </Typography>

      <Typography variant="blockquote">
        &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&rdquo;
      </Typography>

      <Typography variant="h3">The Joke Tax</Typography>
      <Typography variant="p">
        The king&apos;s subjects were not amused. They grumbled and complained,
        but the king was firm:
      </Typography>

      <Typography variant="list">
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners: 20 gold coins</li>
      </Typography>

      <Typography variant="p">
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to let the king&apos;s
        foolishness get him down: a court jester named Jokester.
      </Typography>

      <Typography variant="h3">Jokester&apos;s Revolt</Typography>
      <Typography variant="p">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king&apos;s pillow, in his
        soup, even in the royal toilet.
      </Typography>

      <Typography variant="p">
        The king was furious, but he couldn&apos;t seem to stop Jokester. And
        then, one day, the people of the kingdom discovered that the jokes left
        by Jokester were so funny that they couldn&apos;t help but laugh.
      </Typography>

      <Typography variant="muted">
        This story is a work of fiction. Any resemblance to actual events or
        persons is purely coincidental.
      </Typography>
    </div>
  ),
};

/**
 * Custom Element Override
 */
export const CustomElement: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography as="p" variant="h2">
        H2 styling, but semantically a paragraph
      </Typography>
      <Typography as="div" variant="p">
        Paragraph styling, but semantically a div
      </Typography>
    </div>
  ),
};

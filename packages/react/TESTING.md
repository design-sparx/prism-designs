# Testing Guide

Comprehensive testing guide for Prism React components using Vitest and Testing Library.

## Table of Contents

- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Testing Patterns](#testing-patterns)
- [Coverage Guidelines](#coverage-guidelines)
- [Debugging](#debugging)

---

## Running Tests

### Basic Commands

```bash
# Run all tests once
pnpm test

# Watch mode (re-runs on file changes)
pnpm test:watch

# Visual UI (browser-based test interface)
pnpm test:ui

# Coverage report
pnpm test:coverage
```

### Per-Component Testing

```bash
# Test a specific component
pnpm test button

# Watch a specific component
pnpm test:watch button
```

---

## Writing Tests

### Test File Structure

Each component should have a `.spec.tsx` file colocated with the component:

```
src/components/button/
├── button.tsx
├── button.spec.tsx  ← Tests here
└── index.ts
```

### Basic Test Template

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<ComponentName>Content</ComponentName>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<ComponentName onClick={handleClick}>Click me</ComponentName>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      render(<ComponentName>Accessible</ComponentName>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
```

---

## Testing Patterns

### Testing Library Principles

**1. Test user behavior, not implementation**

✅ Good:

```typescript
expect(screen.getByRole("button")).toBeDisabled();
```

❌ Bad:

```typescript
expect(component.state.disabled).toBe(true);
```

**2. Query by accessibility role**

✅ Good:

```typescript
screen.getByRole("button", { name: /submit/i });
```

❌ Bad:

```typescript
container.querySelector(".btn-submit");
```

**3. Simulate real user interactions**

✅ Good:

```typescript
await user.click(button);
```

❌ Bad:

```typescript
button.onClick();
```

### Common Test Patterns

#### Testing Variants

```typescript
it('renders all variant options', () => {
  const variants = ['primary', 'secondary', 'outline'] as const;

  variants.forEach((variant) => {
    const { container } = render(<Component variant={variant} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
```

#### Testing Click Events

```typescript
it('handles click events', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Click</Button>);
  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Testing Keyboard Navigation

```typescript
it('supports Enter key', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={handleClick}>Press Enter</Button>);

  screen.getByRole('button').focus();
  await user.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});
```

#### Testing Accessibility

```typescript
it('has correct ARIA attributes', () => {
  render(<Button aria-label="Close dialog">×</Button>);
  expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
});

it('indicates disabled state', () => {
  render(<Button disabled>Disabled</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});
```

#### Testing Ref Forwarding

```typescript
import { createRef } from 'react';

it('forwards ref to element', () => {
  const ref = createRef<HTMLButtonElement>();

  render(<Button ref={ref}>Button</Button>);

  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  expect(ref.current?.tagName).toBe('BUTTON');
});
```

---

## Coverage Guidelines

### Target

**80% coverage** for all metrics:

- Lines: 80%
- Functions: 80%
- Branches: 80%
- Statements: 80%

### What to Cover

✅ **DO test**:

- All component variants
- User interactions (click, type, keyboard)
- Accessibility (ARIA, semantic HTML, roles)
- Edge cases (empty state, disabled, long text)
- Props combinations
- Error states

❌ **DON'T test**:

- CSS class names (Tailwind is tested upstream)
- Implementation details (state, effects)
- Third-party libraries (Radix UI, CVA tested upstream)
- Trivial getters/setters

### Viewing Coverage

```bash
# Generate coverage report
pnpm test:coverage

# Open HTML report in browser
open coverage/index.html  # macOS
start coverage/index.html # Windows
xdg-open coverage/index.html # Linux
```

---

## Debugging

### View DOM Structure

```typescript
import { screen } from "../../test/utils";

// Print entire DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole("button"));
```

### Check Available Roles

```typescript
import { logRoles } from '@testing-library/react';

const { container } = render(<Component />);
logRoles(container); // Lists all accessible roles
```

### Use Vitest UI

```bash
pnpm test:ui
```

Opens a browser-based UI where you can:

- See test results visually
- Filter/search tests
- View test source code
- See console logs

### Common Issues

**Issue**: "Unable to find element"

```typescript
// Solution: Use screen.debug() to see what's rendered
render(<Component />);
screen.debug(); // Check what's actually in the DOM
```

**Issue**: "Element is not clickable"

```typescript
// Solution: Check if element is disabled or covered
const button = screen.getByRole("button");
expect(button).not.toBeDisabled();
expect(button).toBeVisible();
```

**Issue**: "Test passes but component doesn't work"

```typescript
// Solution: Test user-facing behavior, not implementation
// Use userEvent for realistic interactions
const user = userEvent.setup();
await user.click(button); // Better than button.click()
```

---

## Best Practices

### Organize with Describe Blocks

```typescript
describe("ComponentName", () => {
  describe("Rendering", () => {
    // Rendering tests
  });

  describe("User Interactions", () => {
    // Interaction tests
  });

  describe("Accessibility", () => {
    // A11y tests
  });

  describe("Edge Cases", () => {
    // Edge case tests
  });
});
```

### Use Clear Test Names

✅ Good:

```typescript
it("renders all variant options");
it("handles click events");
it("indicates disabled state");
```

❌ Bad:

```typescript
it("works");
it("test 1");
it("should render correctly");
```

### Test One Thing Per Test

✅ Good:

```typescript
it("handles click events", () => {
  // Only tests click behavior
});

it("supports keyboard activation", () => {
  // Only tests keyboard
});
```

❌ Bad:

```typescript
it("handles interactions", () => {
  // Tests click AND keyboard AND hover
});
```

### Clean Up After Tests

```typescript
import { vi, afterEach } from "vitest";

afterEach(() => {
  vi.clearAllMocks(); // Clear mock state
});
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/) - Find best queries for elements

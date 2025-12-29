# Prism Examples

This directory contains real-world examples of using the Prism design system.

## Purpose

Examples demonstrate how to integrate and use Prism components in actual applications:

- Installation and setup
- Import patterns
- Component composition
- Theming and customization
- Best practices

## Planned Examples

### Phase 1: Basic Integration

- [ ] `next-app` - Next.js application
  - Shows SSR considerations
  - App Router patterns
  - Component usage in real pages

### Phase 2: Different Frameworks

- [ ] `vite-react` - Pure Vite + React
  - Minimal setup
  - Client-side only
  - Bundle size optimization

### Phase 3: Advanced Use Cases

- [ ] `remix-app` - Remix application
  - SSR differences from Next.js
  - Progressive enhancement
  - Form handling with design system

## When to Add Examples

Examples should be added when:

1. You have 5-10 usable components
2. You want to test package exports in real projects
3. You're ready to teach "consuming a design system"

## Development

Each example is a standalone application that imports from the published (or local workspace) Prism packages.

```bash
# Run a specific example
pnpm --filter example-next dev

# Build all examples
pnpm --filter "./apps/examples/*" build
```

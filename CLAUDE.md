# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Prism** is an educational design system built to teach developers how to create their own design systems. Unlike production design systems (Material-UI, Ant Design), Prism prioritizes **clarity and learning** over features.

### Core Philosophy

- **Education First**: Every architectural decision is documented with inline comments explaining "why"
- **Simple Architecture**: Avoid over-engineering; keep patterns clear and understandable
- **Progressive Complexity**: Start with simple implementations, add complexity only when teaching a concept
- **Real-World Patterns**: Use industry-standard practices from established design systems

## Monorepo Structure

```
prism/
├── packages/
│   ├── tokens/       # Design tokens (colors, spacing, typography)
│   ├── core/         # Core utilities and types
│   ├── react/        # React component library
│   ├── eslint-config/
│   └── typescript-config/
└── apps/
    ├── docs/         # Storybook documentation
    └── examples/     # Real-world usage examples (to be added)
```

### Package Dependencies

- `@prism/core` depends on `@prism/tokens`
- `@prism/react` depends on `@prism/core` and `@prism/tokens`
- `apps/docs` depends on `@prism/react`
- All packages share `@prism/typescript-config` and `@prism/eslint-config`

## Development Commands

```bash
# Installation
pnpm install          # Install all dependencies

# Development
pnpm dev              # Run Storybook + watch mode for all packages
pnpm build            # Build all packages (respects dependency order)

# Testing & Quality
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier

# Package Management
pnpm changeset        # Create a changeset for versioning
pnpm version-packages # Bump versions based on changesets
pnpm release          # Build and publish to npm

# Cleanup
pnpm clean            # Remove node_modules and dist folders

# Preview
pnpm preview-storybook # Serve built Storybook (after running build)
```

### Running Single Package Commands

```bash
# Build only the tokens package
pnpm --filter @prism/tokens build

# Run Storybook only
pnpm --filter docs dev

# Lint only the React package
pnpm --filter @prism/react lint
```

## Architecture Guidelines

### Design Tokens (`packages/tokens`)

Design tokens are the foundation - they must be built first before components can use them.

**Key Concepts:**

- Tokens are pure TypeScript objects exported from `src/`
- No runtime dependencies (keeps the package lightweight)
- Use `as const` for type narrowing and autocomplete
- Export both the token object and its type

**File Structure:**

```
tokens/src/
├── index.ts        # Re-exports all tokens
├── colors.ts       # Color palette with semantic names
├── spacing.ts      # Spacing scale (based on 4px/8px grid)
└── typography.ts   # Font families, sizes, weights, line heights
```

**When adding new tokens:**

1. Create a new file in `src/` (e.g., `shadows.ts`, `borders.ts`)
2. Export the token object with `as const`
3. Export the type (e.g., `export type ShadowToken = typeof shadows`)
4. Add export to `src/index.ts`

### Core Utilities (`packages/core`)

Core contains framework-agnostic utilities and types shared across the design system.

**Key Concepts:**

- Framework-agnostic (no React, Vue, etc. specific code)
- Depends on `@prism/tokens` for accessing design tokens
- Exports utility functions, TypeScript types, and constants
- Used by `@prism/react` and potentially other framework packages

**File Structure:**

```
core/src/
├── index.ts        # Re-exports all utilities and types
├── utils.ts        # Utility functions (cn, string manipulation, etc.)
└── types.ts        # Shared TypeScript types
```

**When adding to core:**

1. Create utility or type in appropriate file
2. Export from `src/index.ts`
3. Ensure it's framework-agnostic (no React/Vue/etc.)

### Component Library (`packages/react`)

Components are built with React and TypeScript, consuming tokens from `@prism/tokens` and utilities from `@prism/core`.

**Folder Structure:**

```
packages/react/src/
├── components/          # Component folders
│   ├── button/
│   │   ├── button.tsx       # Component implementation
│   │   ├── button.spec.tsx  # Tests (required)
│   │   └── index.ts         # Public exports
│   └── [component-name]/
├── test/                # Shared test utilities
│   ├── setup.ts
│   └── utils.tsx
└── styles/              # Global styles
    └── theme.css
```

**Key Patterns:**

- Each component lives in its own folder under `src/components/`
- **Tests are required** - Every component must have a `.spec.tsx` file
- Components are auto-discovered by the build system (no manual config!)
- Use TypeScript interfaces for props (exported for documentation)
- Extend native HTML element props when possible (e.g., `ButtonHTMLAttributes`)

**When adding a new component:**

1. **Create component folder:**

   ```bash
   mkdir src/components/card
   ```

2. **Create component files:**

   - `card.tsx` - Component implementation
   - `card.spec.tsx` - Tests (see `TESTING.md`)
   - `index.ts` - Public API exports

3. **Component file structure** (`card.tsx`):

   ```typescript
   import * as React from 'react';
   import { cva, type VariantProps } from 'class-variance-authority';
   import { cn } from '@prism/core';

   const cardVariants = cva(/* ... */);

   export interface CardProps extends React.HTMLAttributes<HTMLDivElement>,
     VariantProps<typeof cardVariants> {}

   const Card = React.forwardRef<HTMLDivElement, CardProps>(
     ({ className, variant, ...props }, ref) => {
       return <div className={cn(cardVariants({ variant, className }))} ref={ref} {...props} />;
     }
   );

   Card.displayName = 'Card';

   export { Card, cardVariants };
   ```

4. **Index file** (`index.ts`):

   ```typescript
   export { Card, cardVariants } from "./card";
   export type { CardProps } from "./card";
   ```

5. **Build automatically discovers the component!**

   ```bash
   pnpm build  # Auto-generates exports, runs tests, builds component
   ```

6. **Create Storybook story:**
   ```bash
   # apps/docs/stories/card.stories.tsx
   ```

**Testing Requirements:**

- All components must have tests (`.spec.tsx`)
- Target: 80% coverage (lines, functions, branches, statements)
- See `packages/react/TESTING.md` for detailed testing guide
- Tests run automatically during build

**Auto-Discovery:**

The build system automatically:

- Scans `src/components/` for component folders
- Generates `package.json` exports
- Configures build entry points
- **No manual configuration needed!**

Import path: `import { Card } from '@prism/react/card'`

### Documentation (`apps/docs`)

Storybook provides interactive component documentation.

**File Structure:**

```
apps/docs/
├── .storybook/       # Storybook configuration
│   ├── main.ts       # Addons, framework config
│   └── preview.ts    # Global decorators, parameters
└── stories/          # Component stories
    ├── button.stories.tsx
    └── *.stories.tsx
```

**Story Patterns:**

- Use CSF3 (Component Story Format 3) - the modern, concise format
- Include multiple variants (default, sizes, states, etc.)
- Add inline documentation with JSDoc or MDX
- Test edge cases (long text, empty state, disabled, etc.)

## Code Quality Standards

### TypeScript

- **Strict mode enabled** - no implicit any, strict null checks
- **Explicit return types** on public APIs (exported functions, components)
- **Interface over type** for props (better error messages, can be extended)
- **Avoid enums** - use `as const` objects instead (better tree-shaking)

### Component Patterns

- **Composition over configuration** - prefer composable components over large prop APIs
- **Forward refs** when components wrap native elements
- **Display names** for better debugging (set `Component.displayName`)
- **Controlled/Uncontrolled** - support both patterns where appropriate

### Accessibility

- Use semantic HTML elements when possible
- Include ARIA attributes where needed (`aria-label`, `aria-describedby`, etc.)
- Support keyboard navigation (Tab, Enter, Space, Escape)
- Test with screen readers (document how to use the component)

### Documentation

- **Inline comments** explain "why", not "what"
- **JSDoc** for public APIs (props, exported functions)
- **Educational tone** - assume the reader is learning

## Build System (Turborepo)

Turborepo orchestrates builds across the monorepo with intelligent caching.

**Key Configuration (`turbo.json`):**

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"], // Build dependencies first
      "outputs": ["dist/**", "storybook-static/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**How it works:**

- `^build` means "run build in dependencies first"
- When you run `pnpm build`, Turborepo:
  1. Builds `@prism/tokens` first
  2. Then builds `@prism/core` (depends on tokens)
  3. Then builds `@prism/react` (depends on core and tokens)
  4. Finally builds `apps/docs` (depends on react)
- Outputs are cached - unchanged packages skip rebuilding

## Tailwind v4 Theme Generation

Design tokens from `@prism/tokens` are automatically converted to Tailwind v4 CSS custom properties.

**How it works:**

1. Run `pnpm --filter @prism/react generate:theme` (or runs automatically during build)
2. Script reads TypeScript tokens from `@prism/tokens`
3. Generates two CSS files with identical themes but different `@source` paths:
   - `packages/react/src/styles/theme.css` - for React package builds
   - `apps/docs/.storybook/prism.css` - for Storybook dev server

**Why two files?**

- Each file needs different relative `@source` paths (Tailwind v4 requirement)
- `@source` directive tells Tailwind where to scan for utility classes
- Keeps both locations in sync from a single source of truth

**Critical for Storybook:**

- Storybook imports `apps/docs/.storybook/prism.css` in `preview.ts`
- Without correct `@source` paths, Tailwind won't generate utility classes
- Components will render but appear unstyled (native HTML only)

## Package Bundling (tsup)

Components and tokens are bundled with `tsup` (esbuild-powered).

**Configuration (`tsup.config.ts`):**

```typescript
// For tokens package (single entry point)
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});

// For UI package (individual component exports)
export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx"], // Add new components here
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"], // Don't bundle React
  ...options,
}));
```

**Why both CJS and ESM?**

- ESM for modern bundlers (tree-shaking)
- CJS for older Node.js environments
- The `package.json` exports field directs consumers to the right format

## Common Tasks

### Adding a New Component

1. Create component file in `packages/react/src/`:

```tsx
// packages/react/src/card.tsx
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "outlined" | "filled";
  children: React.ReactNode;
}

export function Card({ variant = "outlined", children, ...props }: CardProps) {
  return <div {...props}>{children}</div>;
}

Card.displayName = "Card";
```

2. Add component to `packages/react/tsup.config.ts`:

```typescript
export default defineConfig((options) => ({
  entryPoints: ["src/button.tsx", "src/card.tsx"], // Add card.tsx
  format: ["cjs", "esm"],
  dts: true,
  external: ["react"],
  ...options,
}));
```

3. Add export to `packages/react/package.json`:

```json
{
  "exports": {
    "./card": {
      "types": "./src/card.tsx",
      "import": "./dist/card.mjs",
      "require": "./dist/card.js"
    }
  }
}
```

4. Create story in `apps/docs/stories/card.stories.tsx`

5. Build and test:

```bash
pnpm build
pnpm dev  # View in Storybook
```

### Adding New Design Tokens

1. Create token file in `packages/tokens/src/`:

```typescript
// packages/tokens/src/shadows.ts
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
} as const;

export type ShadowToken = typeof shadows;
```

2. Export from `packages/tokens/src/index.ts`:

```typescript
export * from "./shadows";
```

3. Use in components:

```tsx
import { shadows } from "@prism/tokens";

const cardStyles = {
  boxShadow: shadows.md,
};
```

### Testing Changes Locally

```bash
# Watch mode for all packages
pnpm dev

# Build once to test production output
pnpm build

# Test in Storybook
pnpm --filter docs dev
```

## Important Notes

- **Never skip the build step** - Turborepo depends on dist/ outputs
- **Educational comments are mandatory** - this is a learning project
- **Keep it simple** - avoid premature optimization or abstraction
- **Test accessibility** - use keyboard navigation, check ARIA attributes
- **Maintain the monorepo structure** - don't flatten or reorganize without discussion

## Versioning & Publishing

This project uses Changesets for version management:

1. Make your changes
2. Run `pnpm changeset` and describe your changes
3. Commit the changeset file
4. When ready to release, run `pnpm version-packages` to bump versions
5. Run `pnpm release` to publish to npm

## Resources

- **Turborepo**: https://turbo.build/repo/docs
- **Design Tokens**: https://design-tokens.github.io/community-group/format/
- **Storybook**: https://storybook.js.org/docs
- **tsup**: https://tsup.egoist.dev/

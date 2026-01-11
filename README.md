# Prism Design System

> An educational design system to teach developers how to build their own

![Prism Design System](https://github.com/design-sparx/prism-designs/blob/main/prism-designs-landing.jpg)

Prism is not just another design system—it's a learning resource. Every architectural decision, pattern, and convention is documented to help you understand why design systems are built the way they are.

## Philosophy

Most design systems (Material-UI, Ant Design, Carbon) are production-ready but challenging to learn from. Their codebases are complex, and architectural decisions aren't always clear. Prism takes the opposite approach:

- **Education First**: Inline documentation explains the "why" behind every pattern
- **Simple Architecture**: Easy to understand, not over-engineered
- **Progressive Complexity**: Start simple, add complexity only when needed
- **Real-World Patterns**: Learn industry-standard practices used by major design systems

## What You'll Learn

By studying and contributing to Prism, you'll understand:

### 1. Design Tokens

The foundation of any design system

- Color systems and semantic naming
- Spacing scales and mathematical ratios
- Typography scales and font hierarchies

### 2. Component Architecture

- API design patterns
- Composition vs configuration
- Polymorphic components
- Compound components

### 3. Theming

- CSS-in-JS vs CSS variables
- Light/dark mode implementation
- Custom theme creation

### 4. Accessibility (a11y)

- ARIA patterns
- Keyboard navigation
- Screen reader support
- Focus management

### 5. Build & Distribution

- Monorepo management with Turborepo
- Package bundling with tsup
- Tree-shaking and code-splitting
- Publishing to npm

### 6. Documentation

- Interactive documentation with Storybook
- Component API documentation
- Usage examples and patterns

## Packages

This monorepo contains:

**Core Packages:**

- `@prism/tokens` - Design tokens (colors, spacing, typography)
- `@prism/core` - Core utilities and types
- `@prism/react` - React component library

**Applications:**

- `apps/docs` - Storybook documentation site
- `apps/examples` - Real-world usage examples (planned)

**Tooling:**

- `@prism/typescript-config` - Shared TypeScript configurations
- `@prism/eslint-config` - Shared ESLint configurations
- `@prism/vitest-config` - Shared Vitest testing configurations

## Tech Stack

- **[Turborepo](https://turbo.build/repo)** - High-performance monorepo build system
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[React](https://react.dev/)** - Component framework
- **[tsup](https://tsup.egoist.dev/)** - Fast TypeScript bundler (powered by esbuild)
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - Component testing utilities
- **[Storybook](https://storybook.js.org/)** - Component documentation and development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Changesets](https://github.com/changesets/changesets)** - Version management and changelogs
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Clone the repository
git clone https://github.com/design-sparx/prism-designs.git
cd prism

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start Storybook in development mode
pnpm dev
```

Visit `http://localhost:6006` to see the component documentation.

## Development Commands

```bash
# Development
pnpm dev              # Run all packages in watch mode + start Storybook
pnpm build            # Build all packages (respects dependency order)

# Testing & Quality
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting without modifying

# Package-specific commands
pnpm --filter @prism/react test              # Run tests
pnpm --filter @prism/react test:watch        # Watch mode
pnpm --filter @prism/react test:coverage     # Generate coverage report
pnpm --filter @prism/tokens build            # Build specific package

# Versioning & Publishing
pnpm changeset        # Create a changeset for version bumping
pnpm version-packages # Update package versions based on changesets
pnpm release          # Build and publish packages to npm

# Theme Generation
pnpm generate:theme   # Regenerate Tailwind theme CSS from design tokens

# Cleanup
pnpm clean            # Remove all node_modules and dist folders
```

## Monorepo Structure

```
prism/
├── apps/
│   ├── docs/                    # Storybook documentation
│   │   ├── stories/             # Component stories
│   │   └── .storybook/          # Storybook configuration
│   └── examples/                # Real-world usage examples (planned)
│
├── packages/
│   ├── tokens/                  # Design tokens
│   │   └── src/
│   │       ├── colors.ts        # Color palette
│   │       ├── spacing.ts       # Spacing scale
│   │       └── typography.ts    # Font system
│   │
│   ├── core/                    # Core utilities and types
│   │   └── src/
│   │       ├── utils.ts         # Utility functions
│   │       └── types.ts         # Shared TypeScript types
│   │
│   ├── react/                   # React components
│   │   ├── src/
│   │   │   ├── components/      # Component implementations
│   │   │   ├── test/            # Shared test utilities
│   │   │   └── styles/          # Global styles & theme
│   │   └── TESTING.md           # Testing guide
│   │
│   ├── eslint-config/           # Shared ESLint config
│   ├── typescript-config/       # Shared TypeScript config
│   └── vitest-config/           # Shared Vitest config
│
├── turbo.json                   # Turborepo configuration
├── package.json                 # Root package configuration
├── pnpm-workspace.yaml          # pnpm workspace configuration
└── CLAUDE.md                    # Developer instructions for Claude Code
```

## Learning Path

If you're new to design systems, we recommend this learning path:

### 1. Start with Tokens (`packages/tokens`)

- Read the inline documentation
- Understand the color, spacing, and typography systems
- Try modifying token values and see how they propagate

### 2. Explore Core (`packages/core`)

- See framework-agnostic utilities
- Understand shared TypeScript types
- Learn when to extract to core vs keep in components

### 3. Study Components (`packages/react`)

- Study the Button component as a reference
- Understand the export pattern in `package.json`
- Learn how components consume tokens and core utilities
- Review the testing patterns in `TESTING.md`

### 4. Run Storybook (`apps/docs`)

- See how components are documented
- Understand the stories structure (CSF3 format)
- Try creating a story for a new component

### 5. Build Something

- Create a new component (Card, Input, Badge)
- Apply the patterns you've learned
- Write tests following the testing guide
- Document it in Storybook

## Testing

All components require tests with 80% coverage minimum. See `packages/react/TESTING.md` for:

- Testing setup and utilities
- Component testing patterns
- Accessibility testing
- Coverage requirements

```bash
# Run tests for React package
pnpm --filter @prism/react test

# Watch mode for active development
pnpm --filter @prism/react test:watch

# Generate coverage report
pnpm --filter @prism/react test:coverage
```

## Contributing

Contributions are welcome! This project is designed to be a learning resource, so:

- **Add inline documentation** explaining your decisions
- **Keep it simple** - avoid over-engineering
- **Focus on education** - prioritize clarity over cleverness
- **Write tests** - maintain the 80% coverage standard
- **Follow conventions** - use Conventional Commits format

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(button): add loading state
fix(tokens): correct spacing scale values
docs(readme): update installation instructions
chore(deps): update typescript to 5.5.4
```

Git hooks automatically lint and format your code before commits.

## Architecture Highlights

### Auto-Discovery System

Components are automatically discovered by the build system—no manual configuration needed:

- Add a component folder to `packages/react/src/components/`
- Run `pnpm build`
- The build scripts auto-generate exports and configuration

### Tailwind v4 Integration

Design tokens from `@prism/tokens` are automatically converted to Tailwind CSS custom properties:

- Single source of truth in TypeScript
- Generated CSS files for both React package and Storybook
- Full Tailwind v4 compatibility

### Monorepo Build Pipeline

Turborepo intelligently orchestrates builds:

- Respects package dependencies
- Caches unchanged outputs
- Parallel execution where possible

## Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Design Tokens Specification](https://design-tokens.github.io/community-group/format/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vitest Documentation](https://vitest.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## License

MIT – Feel free to use this for learning and building your own design systems!

---

**Built to help developers learn design systems**

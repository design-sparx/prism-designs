# Prism Design System

> **An educational design system to teach developers how to build their own**

Prism is not just another design system - it's a learning resource. Every architectural decision, pattern, and convention is documented to help you understand **why** design systems are built the way they are.

## 🎯 Philosophy

Most design systems (Material-UI, Ant Design, Carbon) are production-ready but challenging to learn from. Their codebases are complex, and architectural decisions aren't always clear. Prism takes the opposite approach:

- **Education First**: Inline documentation explains the "why" behind every pattern
- **Simple Architecture**: Easy to understand, not over-engineered
- **Progressive Complexity**: Start simple, add complexity only when needed
- **Real-World Patterns**: Learn industry-standard practices used by major design systems

## 🚀 What You'll Learn

By studying and contributing to Prism, you'll understand:

1. **Design Tokens** - The foundation of any design system
   - Color systems and semantic naming
   - Spacing scales and mathematical ratios
   - Typography scales and font hierarchies

2. **Component Architecture**
   - API design patterns
   - Composition vs configuration
   - Polymorphic components
   - Compound components

3. **Theming**
   - CSS-in-JS vs CSS variables
   - Light/dark mode implementation
   - Custom theme creation

4. **Accessibility (a11y)**
   - ARIA patterns
   - Keyboard navigation
   - Screen reader support
   - Focus management

5. **Build & Distribution**
   - Monorepo management with Turborepo
   - Package bundling with tsup
   - Tree-shaking and code-splitting
   - Publishing to npm

6. **Documentation**
   - Interactive documentation with Storybook
   - Component API documentation
   - Usage examples and patterns

## 📦 Packages

This monorepo contains:

- **`@prism/tokens`** - Design tokens (colors, spacing, typography)
- **`@prism/core`** - Core utilities and types
- **`@prism/react`** - React component library
- **`apps/docs`** - Storybook documentation site
- **`apps/examples`** - Real-world usage examples (to be added)

### Additional Tooling Packages

- **`@prism/typescript-config`** - Shared TypeScript configurations
- **`@prism/eslint-config`** - Shared ESLint configurations

## 🛠️ Tech Stack

- **[Turborepo](https://turbo.build/repo)** - High-performance monorepo build system
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[React](https://react.dev/)** - Component framework
- **[tsup](https://tsup.egoist.dev/)** - Fast TypeScript bundler (powered by esbuild)
- **[Storybook](https://storybook.js.org/)** - Component documentation and development
- **[Changesets](https://github.com/changesets/changesets)** - Version management and changelogs
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager

## 🏃 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/prism.git
cd prism

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start Storybook in development mode
pnpm dev
```

Visit `http://localhost:6006` to see the component documentation.

## 📚 Development Commands

```bash
# Development
pnpm dev              # Run all packages in watch mode + start Storybook
pnpm build            # Build all packages

# Linting & Formatting
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier

# Versioning & Publishing
pnpm changeset        # Create a changeset for version bumping
pnpm version-packages # Update package versions based on changesets
pnpm release          # Build and publish packages to npm

# Cleanup
pnpm clean            # Remove all node_modules and dist folders
```

## 🏗️ Monorepo Structure

```
prism/
├── apps/
│   ├── docs/                # Storybook documentation
│   │   ├── stories/         # Component stories
│   │   └── .storybook/      # Storybook configuration
│   └── examples/            # Real-world usage examples (to be added)
├── packages/
│   ├── tokens/              # Design tokens
│   │   └── src/
│   │       ├── colors.ts    # Color palette
│   │       ├── spacing.ts   # Spacing scale
│   │       └── typography.ts # Font system
│   ├── core/                # Core utilities and types
│   │   └── src/
│   │       ├── utils.ts     # Utility functions
│   │       └── types.ts     # Shared TypeScript types
│   ├── react/               # React components
│   │   └── src/
│   │       └── button.tsx   # Example component
│   ├── eslint-config/       # Shared ESLint config
│   └── typescript-config/   # Shared TypeScript config
├── turbo.json               # Turborepo configuration
├── package.json             # Root package configuration
└── pnpm-workspace.yaml      # pnpm workspace configuration
```

## 🎓 Learning Path

If you're new to design systems, we recommend this learning path:

1. **Start with Tokens** (`packages/tokens`)
   - Read the inline documentation
   - Understand the color, spacing, and typography systems
   - Try modifying token values and see how they propagate

2. **Explore Core** (`packages/core`)
   - See framework-agnostic utilities
   - Understand shared TypeScript types
   - Learn when to extract to core vs keep in components

3. **Explore Components** (`packages/react`)
   - Study the Button component as a reference
   - Understand the export pattern in `package.json`
   - Learn how components consume tokens and core utilities

4. **Run Storybook** (`apps/docs`)
   - See how components are documented
   - Understand the stories structure
   - Try creating a story for a new component

5. **Build Something**
   - Create a new component (Card, Input, Badge)
   - Apply the patterns you've learned
   - Document it in Storybook

## 🤝 Contributing

Contributions are welcome! This project is designed to be a learning resource, so:

- **Add inline documentation** explaining your decisions
- **Keep it simple** - avoid over-engineering
- **Focus on education** - prioritize clarity over cleverness

## 📖 Additional Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Design Tokens Specification](https://design-tokens.github.io/community-group/format/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 📄 License

MIT – Feel free to use this for learning and building your own design systems!

---

**Built with ❤️ to help developers learn design systems**

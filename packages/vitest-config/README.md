# @prism/vitest-config

Shared Vitest configuration for Prism packages.

## Usage

### Base Configuration

For non-React packages (tokens, core):

```typescript
// vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@prism/vitest-config/base";

export default mergeConfig(
  baseConfig,
  defineConfig({
    // Package-specific overrides
  }),
);
```

### React Configuration

For React packages:

```typescript
// vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import reactConfig from "@prism/vitest-config/react";
import path from "path";

export default mergeConfig(
  reactConfig,
  defineConfig({
    // Package-specific overrides
    resolve: {
      alias: {
        "@prism/core": path.resolve(__dirname, "../core/src"),
        "@prism/tokens": path.resolve(__dirname, "../tokens/src"),
      },
    },
  }),
);
```

## What's Included

### Base Config

- Node environment
- V8 coverage provider
- Global test functions (describe, it, expect)
- Standard exclusions (node_modules, dist, test files)

### React Config

- Extends base configuration
- Happy-dom environment for DOM testing
- @vitejs/plugin-react for JSX transformation
- 80% coverage thresholds
- React component coverage tracking

## Features

- **Shared Configuration**: DRY principle across monorepo
- **Extensible**: Easily override settings per package
- **Educational**: Inline comments explain decisions
- **Modern**: Uses latest Vitest features

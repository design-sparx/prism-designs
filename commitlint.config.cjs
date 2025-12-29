/**
 * Commitlint Configuration
 *
 * Enforces conventional commit messages:
 * - type(scope?): subject
 *
 * Examples:
 * - feat: add button component
 * - fix(core): resolve utility function bug
 * - docs: update README
 * - chore(deps): update dependencies
 *
 * Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
 */

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code style changes (formatting, missing semi-colons, etc)
        "refactor", // Code refactoring
        "perf", // Performance improvements
        "test", // Adding or updating tests
        "build", // Build system changes
        "ci", // CI/CD changes
        "chore", // Other changes that don't modify src or test files
        "revert", // Revert a previous commit
      ],
    ],
    "subject-case": [2, "never", ["upper-case"]], // Subject should not start with uppercase
    "header-max-length": [2, "always", 100], // Max 100 characters
  },
};

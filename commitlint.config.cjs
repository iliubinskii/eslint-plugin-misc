/**
 * @type {Partial<import("@commitlint/types").QualifiedConfig>}
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  ignores: [],
  rules: {
    "subject-case": [2, "always", ["sentence-case"]],
    "type-enum": [
      2,
      "always",
      // @sorted
      [
        "build",
        "chore",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test"
      ]
    ]
  }
};

module.exports = config;

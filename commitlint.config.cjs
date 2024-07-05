module.exports = {
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

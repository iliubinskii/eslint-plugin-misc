import * as utils from "../utils";
import { core } from "../core";

export const noShadow = utils.wrapRule({
  rule: core.wrap,
  options: [
    {
      plugin: "@typescript-eslint/eslint-plugin",
      rule: "no-shadow",
      skip: "TSEnumDeclaration *"
    }
  ],
  docs: {
    description:
      'This rule wraps "@typescript-eslint/no-shadow" rule, but skips checking enum.',
    failExamples: `
      const x = 1;
      function f() { const x = 1; }
    `,
    passExamples: `
      const x = 1;
      enum E { x = "x" }
    `
  }
});

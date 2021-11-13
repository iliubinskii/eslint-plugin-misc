import * as utils from "../utils";
import { misc } from "../misc";

export const noShadow = utils.wrapRule({
  rule: misc.wrap,
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

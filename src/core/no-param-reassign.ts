import * as utils from "../utils";
import { base } from "./base";

export const noParamReassign = utils.wrapRule({
  rule: base.wrap,
  options: [
    {
      plugin: "eslint",
      rule: "no-param-reassign",
      skip: ":matches(ArrowFunctionExpression, FunctionDeclaration, FunctionExpression) > BlockStatement > ExpressionStatement:first-child *"
    }
  ],
  docs: {
    description:
      'This rule wraps "no-param-reassign" core rule, but allows to edit params at the top of function body.',
    failExamples: `
      function f(x, y) {
        x;
        y++;
      }
    `,
    passExamples: `
      function f(x, y) {
        x++;
        y;
      }
    `
  }
});

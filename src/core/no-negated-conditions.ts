import * as utils from "../utils";
import { base } from "./base";

export const noNegatedConditions = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "No negated condition",
      selector: [
        'IfStatement > BinaryExpression[operator="!=="]',
        'IfStatement > UnaryExpression[operator="!"]',
        ':not(LogicalExpression) > LogicalExpression > BinaryExpression.left[operator="!=="]',
        ':not(LogicalExpression) > LogicalExpression > UnaryExpression.left[operator="!"]'
      ]
    }
  ],
  docs: {
    description: "Disallows negated conditions.",
    failExamples: `
      if (!x && y) {}
      if (x !== -1 && y) {}
    `,
    passExamples: `
      if (x && !y) {}
      if (x && y !== -1) {}
    `
  }
});

import * as utils from "../utils";
import { core } from "./core";

export const noNegatedConditions = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "No negated condition",
      selector: [
        'IfStatement > BinaryExpression[operator="!=="]',
        'IfStatement > UnaryExpression[operator="!"]',
        'IfStatement > LogicalExpression > BinaryExpression.left[operator="!=="]',
        'IfStatement > LogicalExpression > UnaryExpression.left[operator="!"]'
      ]
    }
  ],
  docs: {
    description: "Disallows negated conditions.",
    failExamples: `
      if (!x) {}
      if (x !== 1) {}
    `,
    passExamples: `
      if (x) {}
      if (x === 1) {}
    `
  }
});

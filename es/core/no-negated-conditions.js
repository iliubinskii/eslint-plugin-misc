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
                ':not(LogicalExpression) > LogicalExpression[operator="&&"] > BinaryExpression.left[operator="!=="]',
                ':not(LogicalExpression) > LogicalExpression[operator="&&"] > UnaryExpression.left[operator="!"]',
                ':not(LogicalExpression) > LogicalExpression[operator="||"] > BinaryExpression[operator="!=="]',
                ':not(LogicalExpression) > LogicalExpression[operator="||"] > UnaryExpression[operator="!"]'
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
//# sourceMappingURL=no-negated-conditions.js.map
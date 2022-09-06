"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNegatedConditions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noNegatedConditions = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
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
//# sourceMappingURL=no-negated-conditions.js.map
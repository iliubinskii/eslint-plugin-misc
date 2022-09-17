"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noParamReassign = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noParamReassign = utils.wrapRule({
    rule: base_1.base.wrap,
    options: [
        {
            plugin: "eslint",
            rule: "no-param-reassign",
            skip: ":matches(ArrowFunctionExpression, FunctionDeclaration, FunctionExpression) > BlockStatement > ExpressionStatement:first-child *"
        }
    ],
    docs: {
        description: 'This rule wraps "no-param-reassign" core rule, but allows to edit params at the top of function body.',
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
//# sourceMappingURL=no-param-reassign.js.map
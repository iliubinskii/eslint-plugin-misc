"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrowFunctionProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferArrowFunctionProperty = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Prefer arrow function",
            selector: "Property > FunctionExpression.value"
        }
    ],
    docs: {
        description: "Requires use of arrow functions.",
        failExamples: `
      const x = { f: function () {} };
    `,
        passExamples: `
      const x = { f: () => {} };
    `
    }
});
//# sourceMappingURL=prefer-arrow-function-property.js.map
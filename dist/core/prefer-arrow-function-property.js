"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrowFunctionProperty = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.preferArrowFunctionProperty = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Prefer arrow function",
            selector: "Property > FunctionExpression.value:not([params.0.name=this])"
        }
    ],
    docs: {
        description: "Requires use of arrow functions.",
        failExamples: `
      const x = {
        f() {},
        g: function () {}
      };
    `,
        passExamples: `
      const x = {
        f: () => {},
        g(this: void) {},
        h: function (this: void) {}
      };
    `
    }
});
//# sourceMappingURL=prefer-arrow-function-property.js.map
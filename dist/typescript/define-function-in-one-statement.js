"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineFunctionInOneStatement = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
exports.defineFunctionInOneStatement = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "Object.assign" to define function properties in one statement',
            selector: "AssignmentExpression > MemberExpression.left > Identifier.object",
            typeIs: utils.TypeGroup.function
        }
    ],
    docs: {
        description: "Requires that function is defined in one statement.",
        failExamples: `
      function f() {}
      f.x = 1;
    `,
        passExamples: `
      const f = Object.assign(() => {}, { x: 1 });
    `
    }
});
//# sourceMappingURL=define-function-in-one-statement.js.map
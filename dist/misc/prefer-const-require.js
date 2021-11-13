"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferConstRequire = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferConstRequire = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Assign "require" to const',
            selector: ":not(VariableDeclarator) > CallExpression > Identifier.callee[name=require]"
        }
    ],
    docs: {
        description: 'Requires "require()" to be assigned to variable.',
        failExamples: `
      function f() { return require("node:path"); }
    `,
        passExamples: `
      const path = require("node:path");

    `
    }
});
//# sourceMappingURL=prefer-const-require.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
const typescript_misc_1 = require("typescript-misc");
exports.requireJsdoc = (0, typescript_misc_1.evaluate)(() => {
    const prefix = "VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
    const suffix = ":matches(ArrowFunctionExpression, FunctionExpression)";
    return utils.wrapRule({
        rule: core_1.core["require-jsdoc"],
        options: [
            {
                includeSelectors: [
                    `${prefix} > ${suffix}`,
                    `${prefix} > ObjectExpression > Property > ${suffix}`
                ],
                noDefaultSelectors: true
            }
        ]
    });
});
//# sourceMappingURL=require-jsdoc.js.map
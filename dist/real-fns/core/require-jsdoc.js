"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
const real_fns_1 = require("real-fns");
exports.requireJsdoc = (0, real_fns_1.evaluate)(() => {
    const prefix = ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
    return utils.wrapRule({
        rule: core_1.core["require-jsdoc"],
        options: [
            {
                includeSelectors: [
                    `${prefix} > ArrowFunctionExpression`,
                    `${prefix} > FunctionExpression`,
                    `${prefix} > ObjectExpression > Property > ArrowFunctionExpression`,
                    `${prefix} > ObjectExpression > Property > FunctionExpression`
                ],
                noDefaultSelectors: true
            }
        ]
    });
});
//# sourceMappingURL=require-jsdoc.js.map
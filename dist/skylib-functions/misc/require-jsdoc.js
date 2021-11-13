"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJsdoc = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const misc_1 = require("../../misc");
exports.requireJsdoc = (0, functions_1.evaluate)(() => {
    const prefix = ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
    return utils.wrapRule({
        rule: misc_1.misc["require-jsdoc"],
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
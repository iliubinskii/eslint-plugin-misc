"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireReturnInDefineFn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const misc_1 = require("../../misc");
// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
exports.requireReturnInDefineFn = (0, functions_1.evaluate)(() => {
    const prefix = ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
    return utils.wrapRule({
        rule: misc_1.misc["no-restricted-syntax"],
        options: [
            {
                message: "Missing return type",
                selector: [
                    `${prefix} > ArrowFunctionExpression[returnType=undefined]`,
                    `${prefix} > FunctionExpression[returnType=undefined]`,
                    `${prefix} > ObjectExpression > Property > ArrowFunctionExpression[returnType=undefined]`,
                    `${prefix} > ObjectExpression > Property > FunctionExpression[returnType=undefined]`
                ]
            }
        ]
    });
});
//# sourceMappingURL=require-return-in-defineFn.js.map
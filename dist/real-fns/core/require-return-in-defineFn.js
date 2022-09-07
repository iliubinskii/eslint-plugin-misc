"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireReturnInDefineFn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
const real_fns_1 = require("real-fns");
// eslint-disable-next-line misc/max-identifier-blocks -- Ok
exports.requireReturnInDefineFn = (0, real_fns_1.evaluate)(() => {
    const prefix = ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
    return utils.wrapRule({
        rule: core_1.core["no-restricted-syntax"],
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
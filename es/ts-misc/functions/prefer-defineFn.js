/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../utils";
import { core } from "../../core";
export const preferDefineFn = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "defineFn" function instead',
            selector: ":matches(ExportNamedDeclaration, Program, TSModuleBlock) > VariableDeclaration > VariableDeclarator > CallExpression[callee.object.name=o][callee.property.name=assign]"
        }
    ]
});
//# sourceMappingURL=prefer-defineFn.js.map
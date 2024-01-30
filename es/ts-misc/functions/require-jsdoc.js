import * as utils from "../../utils";
import { core } from "../../core";
import { evaluate } from "real-fns";
export const requireJsdoc = evaluate(() => {
    const prefix = "VariableDeclarator[id.typeAnnotation=undefined] > CallExpression[callee.name=defineFn]";
    const suffix = ":matches(ArrowFunctionExpression, FunctionExpression)";
    return utils.wrapRule({
        rule: core["require-jsdoc"],
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
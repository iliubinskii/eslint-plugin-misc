import * as utils from "../../utils";
import { core } from "../../core";
export const preferEvaluate = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "evaluate" function instead',
            selector: "CallExpression[arguments.length=0] > ArrowFunctionExpression.callee"
        }
    ]
});
//# sourceMappingURL=prefer-evaluate.js.map
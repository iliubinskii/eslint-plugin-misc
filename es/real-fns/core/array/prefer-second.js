import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferSecond = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.second" function instead',
            selector: "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=1]"
        }
    ]
});
//# sourceMappingURL=prefer-second.js.map
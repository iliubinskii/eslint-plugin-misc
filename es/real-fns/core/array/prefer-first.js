import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferFirst = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.first" function instead',
            selector: "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=0]"
        }
    ]
});
//# sourceMappingURL=prefer-first.js.map
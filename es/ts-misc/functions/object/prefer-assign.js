import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferAssign = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.assign" function instead',
            selector: "CallExpression > .callee[object.name=Object][property.name=assign]"
        }
    ]
});
//# sourceMappingURL=prefer-assign.js.map
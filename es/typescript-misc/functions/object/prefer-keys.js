import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferKeys = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.keys" function instead',
            selector: "CallExpression > .callee[object.name=Object][property.name=keys]"
        }
    ]
});
//# sourceMappingURL=prefer-keys.js.map
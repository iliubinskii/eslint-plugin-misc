import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferEntries = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.entries" function instead',
            selector: "CallExpression > .callee[object.name=Object][property.name=entries]"
        }
    ]
});
//# sourceMappingURL=prefer-entries.js.map
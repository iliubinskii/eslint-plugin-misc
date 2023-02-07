import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferString = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "cast.string" function instead',
            selector: "CallExpression > .callee[name=String]"
        }
    ]
});
//# sourceMappingURL=prefer-string.js.map
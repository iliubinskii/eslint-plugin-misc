/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferClearTimeout = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.clearTimeout" function instead',
            selector: "CallExpression > .callee[name=clearTimeout]"
        }
    ]
});
//# sourceMappingURL=prefer-clearTimeout.js.map
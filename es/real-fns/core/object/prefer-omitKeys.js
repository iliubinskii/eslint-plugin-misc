/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferOmitKeys = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.omitKeys" function instead',
            selector: "CallExpression > .callee[object.name=_][property.name=omit]"
        }
    ]
});
//# sourceMappingURL=prefer-omitKeys.js.map
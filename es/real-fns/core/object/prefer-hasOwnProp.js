/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferHasOwnProp = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.hasOwnProp" function instead',
            selector: "CallExpression > .callee[object.object.object.name=Object][object.object.property.name=prototype][object.property.name=hasOwnProperty][property.name=call]"
        }
    ]
});
//# sourceMappingURL=prefer-hasOwnProp.js.map
/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../utils";
import { core } from "../../core";
// eslint-disable-next-line misc/max-identifier-blocks -- Ok
export const preferMockCallsToBe = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "mockCallsToBe" function instead',
            selector: [
                "Identifier[name=mockClear]",
                "Identifier[name=toHaveBeenCalled]",
                "Identifier[name=toHaveBeenCalledTimes]",
                "Identifier[name=toHaveBeenCalledWith]"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-mockCallsToBe.js.map
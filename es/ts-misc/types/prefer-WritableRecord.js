/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../utils";
import { core } from "../../core";
export const preferWritableRecord = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "WritableRecord" type instead',
            selector: "Identifier[name=Record]"
        }
    ]
});
//# sourceMappingURL=prefer-WritableRecord.js.map
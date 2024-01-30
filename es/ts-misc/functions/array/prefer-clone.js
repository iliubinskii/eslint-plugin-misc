import * as utils from "../../../utils";
import { core } from "../../../core";
export const preferClone = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.clone" function instead',
            selector: "ArrayExpression[elements.length=1] > SpreadElement"
        }
    ]
});
//# sourceMappingURL=prefer-clone.js.map
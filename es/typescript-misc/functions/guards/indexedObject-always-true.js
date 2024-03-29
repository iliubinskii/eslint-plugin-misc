/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { typescript } from "../../../typescript";
export const indexedObjectAlwaysTrue = utils.wrapRule({
    rule: typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always true",
            selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:indexedObject|indexedObjectU)$/u] > .arguments:first-child",
            typeIs: utils.TypeGroup.object
        }
    ]
});
//# sourceMappingURL=indexedObject-always-true.js.map
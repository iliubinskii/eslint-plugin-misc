/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { typescript } from "../../../typescript";
export const indexedObjectAlwaysFalse = utils.wrapRule({
    rule: typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always false",
            selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:indexedObject|indexedObjectU)$/u] > .arguments:first-child",
            typeHasNoneOf: [
                utils.TypeGroup.any,
                utils.TypeGroup.object,
                utils.TypeGroup.unknown
            ]
        }
    ]
});
//# sourceMappingURL=indexedObject-always-false.js.map
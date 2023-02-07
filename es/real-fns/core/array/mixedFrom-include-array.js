/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../../utils";
import { typescript } from "../../../typescript";
export const mixedFromIncludeArray = utils.wrapRule({
    rule: typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Expecting type to include array",
            selector: "CallExpression[callee.object.name=a][callee.property.name=fromMixed] > .arguments:first-child",
            typeHasNoneOf: [utils.TypeGroup.arrayOrTuple]
        }
    ]
});
//# sourceMappingURL=mixedFrom-include-array.js.map
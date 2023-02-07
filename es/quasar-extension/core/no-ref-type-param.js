import * as utils from "../../utils";
import { core } from "../../core";
export const noRefTypeParam = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary type parameter",
            selector: "CallExpression[callee.name=ref][arguments.0.type=Literal] > TSTypeParameterInstantiation > :matches(TSBooleanKeyword, TSNumberKeyword, TSStringKeyword)"
        }
    ]
});
//# sourceMappingURL=no-ref-type-param.js.map
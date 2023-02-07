import * as utils from "../../../utils";
import { core } from "../../../core";
export const consistentGenericName = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary argument",
            selector: "Property[key.name=components] > ObjectExpression > Property[value.callee.name=/^generic[A-Z]/u] > Literal.key:not([value=/^e-[\\w-]+__[\\w-]+$/u])"
        }
    ]
});
//# sourceMappingURL=consistent-generic-name.js.map
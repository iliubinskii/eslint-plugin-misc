import * as utils from "../../utils";
import { core } from "../../core";
export const noDisable = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "Do not disable rules",
            selector: [
                "Property[key.name=rules] > ObjectExpression > Property > ArrayExpression > Literal:first-child[value=off]",
                "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
            ]
        }
    ]
});
//# sourceMappingURL=no-disable.js.map
import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQExpansionItem = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-expansion-item" component instead',
            selector: "VElement[name=q-expansion-item]"
        }
    ]
});
//# sourceMappingURL=no-q-expansion-item.js.map
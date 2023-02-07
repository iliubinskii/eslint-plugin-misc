import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQCard = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-card" component instead',
            selector: "VElement[name=q-card]"
        }
    ]
});
//# sourceMappingURL=no-q-card.js.map
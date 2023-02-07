import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQCardSection = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-card-section" component instead',
            selector: "VElement[name=q-card-section]"
        }
    ]
});
//# sourceMappingURL=no-q-card-section.js.map
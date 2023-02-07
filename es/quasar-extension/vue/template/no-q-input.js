import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQInput = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-input" component instead',
            selector: "VElement[name=q-input]"
        }
    ]
});
//# sourceMappingURL=no-q-input.js.map
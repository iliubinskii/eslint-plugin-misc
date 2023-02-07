import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQField = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-field" component instead',
            selector: "VElement[name=q-field]"
        }
    ]
});
//# sourceMappingURL=no-q-field.js.map
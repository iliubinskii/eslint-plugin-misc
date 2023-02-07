import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQForm = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-form" component instead',
            selector: "VElement[name=q-form]"
        }
    ]
});
//# sourceMappingURL=no-q-form.js.map
import * as utils from "../../../utils";
import { core } from "../../../core";
export const noQPopupProxy = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-popup-proxy" component instead',
            selector: "VElement[name=q-popup-proxy]"
        }
    ]
});
//# sourceMappingURL=no-q-popup-proxy.js.map
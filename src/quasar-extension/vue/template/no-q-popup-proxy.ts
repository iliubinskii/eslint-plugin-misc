import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQPopupProxy = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-popup-proxy" component instead',
      selector: "VElement[name=q-popup-proxy]"
    }
  ]
});

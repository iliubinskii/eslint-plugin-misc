import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQPopupProxy = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-popup-proxy" component instead',
      selector: "VElement[name=q-popup-proxy]"
    }
  ]
});

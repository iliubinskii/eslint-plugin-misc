import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQMenu = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-menu" component instead',
      selector: "VElement[name=q-menu]"
    }
  ]
});

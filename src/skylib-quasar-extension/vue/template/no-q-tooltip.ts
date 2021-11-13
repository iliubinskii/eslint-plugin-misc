import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQTooltip = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-tooltip" component instead',
      selector: "VElement[name=q-tooltip]"
    }
  ]
});

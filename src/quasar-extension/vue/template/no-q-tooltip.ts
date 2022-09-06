import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQTooltip = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-tooltip" component instead',
      selector: "VElement[name=q-tooltip]"
    }
  ]
});

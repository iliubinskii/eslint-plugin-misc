import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQOptionGroup = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-option-group" component instead',
      selector: "VElement[name=q-option-group]"
    }
  ]
});

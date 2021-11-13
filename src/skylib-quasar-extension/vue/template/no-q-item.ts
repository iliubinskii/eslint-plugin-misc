import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQItem = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-item" component instead',
      selector: "VElement[name=q-item]"
    }
  ]
});

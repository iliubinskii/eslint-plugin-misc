import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQSelect = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-select" component instead',
      selector: "VElement[name=q-select]"
    }
  ]
});

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQInput = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-input" component instead',
      selector: "VElement[name=q-input]"
    }
  ]
});

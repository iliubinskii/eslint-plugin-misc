import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQToggle = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-toggle" component instead',
      selector: "VElement[name=q-toggle]"
    }
  ]
});

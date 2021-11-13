import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQBtn = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-button" component instead',
      selector: "VElement[name=q-btn]"
    }
  ]
});

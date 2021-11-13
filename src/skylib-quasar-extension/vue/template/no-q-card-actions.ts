import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCardActions = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-card-actions" component instead',
      selector: "VElement[name=q-card-actions]"
    }
  ]
});

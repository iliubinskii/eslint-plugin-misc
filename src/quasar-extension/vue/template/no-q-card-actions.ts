import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQCardActions = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-card-actions" component instead',
      selector: "VElement[name=q-card-actions]"
    }
  ]
});

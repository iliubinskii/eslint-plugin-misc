import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQCardActions = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "e-card-actions" component instead',
      selector: "VElement[name=q-card-actions]"
    }
  ]
});

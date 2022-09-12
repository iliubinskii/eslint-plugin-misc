import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQBtn = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "e-button" component instead',
      selector: "VElement[name=q-btn]"
    }
  ]
});

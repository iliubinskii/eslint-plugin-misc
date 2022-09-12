import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQItem = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "e-item" component instead',
      selector: "VElement[name=q-item]"
    }
  ]
});

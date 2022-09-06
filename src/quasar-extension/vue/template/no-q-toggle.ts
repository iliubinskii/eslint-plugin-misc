import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQToggle = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-toggle" component instead',
      selector: "VElement[name=q-toggle]"
    }
  ]
});

import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQSelect = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-select" component instead',
      selector: "VElement[name=q-select]"
    }
  ]
});

import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQInput = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-input" component instead',
      selector: "VElement[name=q-input]"
    }
  ]
});

import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQField = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-field" component instead',
      selector: "VElement[name=q-field]"
    }
  ]
});

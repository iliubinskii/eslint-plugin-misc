import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQForm = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-form" component instead',
      selector: "VElement[name=q-form]"
    }
  ]
});

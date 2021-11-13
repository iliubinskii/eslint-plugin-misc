import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQForm = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-form" component instead',
      selector: "VElement[name=q-form]"
    }
  ]
});

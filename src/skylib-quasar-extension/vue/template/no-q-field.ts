import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQField = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-field" component instead',
      selector: "VElement[name=q-field]"
    }
  ]
});

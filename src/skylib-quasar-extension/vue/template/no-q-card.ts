import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCard = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-card" component instead',
      selector: "VElement[name=q-card]"
    }
  ]
});

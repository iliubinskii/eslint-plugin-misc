import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQCardSection = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-card-section" component instead',
      selector: "VElement[name=q-card-section]"
    }
  ]
});

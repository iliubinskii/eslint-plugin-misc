import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferLabelProp = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "label" prop instead',
      selector: [
        "VElement[name=/^(?:m-button|m-form-button|m-icon-button)$/u][children.length=1] > .children",
        "VElement[name=/^(?:m-button|m-form-button|m-icon-button)$/u][children.length=3][children.0.value=/^s+$/u][children.2.value=/^s+$/u] > .children"
      ]
    }
  ]
});

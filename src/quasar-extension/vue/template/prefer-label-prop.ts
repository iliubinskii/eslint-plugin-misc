import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferLabelProp = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "label" prop instead',
      selector: [
        "VElement[name=/^(?:e-button|e-form-button|e-icon-button)$/u][children.length=1] > .children",
        "VElement[name=/^(?:e-button|e-form-button|e-icon-button)$/u][children.length=3][children.0.value=/^s+$/u][children.2.value=/^s+$/u] > .children"
      ]
    }
  ]
});

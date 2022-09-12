import * as utils from "../../../utils";
import { core } from "../../../core";

export const noQKnob = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "e-knob" component instead',
      selector: "VElement[name=q-knob]"
    }
  ]
});

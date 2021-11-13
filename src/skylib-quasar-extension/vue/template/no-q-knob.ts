import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noQKnob = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "m-knob" component instead',
      selector: "VElement[name=q-knob]"
    }
  ]
});

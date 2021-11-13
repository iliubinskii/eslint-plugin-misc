import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferReflect = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "reflect" module instead',
      selector: "Identifier[name=Reflect]"
    }
  ]
});

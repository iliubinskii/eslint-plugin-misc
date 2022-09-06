import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferReflect = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "reflect" module instead',
      selector: "Identifier[name=Reflect]"
    }
  ]
});

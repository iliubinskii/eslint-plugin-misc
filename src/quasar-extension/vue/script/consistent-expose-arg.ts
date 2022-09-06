import * as utils from "../../../utils";
import { core } from "../../../core";

export const consistentExposeArg = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary argument",
      selector:
        "CallExpression[callee.name=expose] > ObjectExpression[properties.length=0]"
    }
  ]
});

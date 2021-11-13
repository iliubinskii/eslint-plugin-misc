import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const consistentExposeArg = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary argument",
      selector:
        "CallExpression[callee.name=expose] > ObjectExpression[properties.length=0]"
    }
  ]
});

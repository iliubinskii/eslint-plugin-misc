import * as utils from "../../utils";
import { misc } from "../../misc";

export const requireRefTypeParam = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[arguments.length=0][typeParameters=undefined] > Identifier.callee[name=ref]"
    }
  ]
});

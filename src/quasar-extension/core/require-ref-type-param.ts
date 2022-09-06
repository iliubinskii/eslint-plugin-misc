import * as utils from "../../utils";
import { core } from "../../core";

export const requireRefTypeParam = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[arguments.length=0][typeParameters=undefined] > Identifier.callee[name=ref]"
    }
  ]
});

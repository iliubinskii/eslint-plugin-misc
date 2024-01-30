import * as utils from "../../../utils";
import { core } from "../../../core";

export const requireObjectTypeParam = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[callee.object.object.name=is][callee.object.property.name=object][callee.property.name=/^(?:factory|of)$/][typeParameters=undefined]"
    }
  ]
});

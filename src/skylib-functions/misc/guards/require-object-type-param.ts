import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const requireObjectTypeParam = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Missing type parameter",
      selector:
        "CallExpression[callee.object.object.name=is][callee.object.property.name=object][callee.property.name=/^(?:factory|of)$/][typeParameters=undefined]"
    }
  ]
});

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noComputedTypeParam = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Move type definition to function",
      selector:
        "CallExpression[callee.name=computed] > TSTypeParameterInstantiation"
    }
  ]
});

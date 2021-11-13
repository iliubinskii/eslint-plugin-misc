import * as utils from "../../utils";
import { misc } from "../../misc";

export const noEvaluateTypeParam = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Move type definition to function",
      selector:
        "CallExpression[callee.name=evaluate] > TSTypeParameterInstantiation"
    }
  ]
});

import * as utils from "../../utils";
import { core } from "../../core";

export const noEvaluateTypeParam = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Move type definition to function",
      selector:
        "CallExpression[callee.name=evaluate] > TSTypeParameterInstantiation"
    }
  ]
});

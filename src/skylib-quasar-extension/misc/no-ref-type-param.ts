import * as utils from "../../utils";
import { misc } from "../../misc";

export const noRefTypeParam = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary type parameter",
      selector:
        "CallExpression[callee.name=ref][arguments.0.type=Literal] > TSTypeParameterInstantiation > :matches(TSBooleanKeyword, TSNumberKeyword, TSStringKeyword)"
    }
  ]
});

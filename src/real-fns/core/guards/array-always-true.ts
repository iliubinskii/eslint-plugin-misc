import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const arrayAlwaysTrue = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:array|arrayU)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.array
    }
  ]
});

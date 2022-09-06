import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const nullAlwaysTrue = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=null] > .arguments:first-child",
      typeIs: utils.TypeGroup.null
    }
  ]
});

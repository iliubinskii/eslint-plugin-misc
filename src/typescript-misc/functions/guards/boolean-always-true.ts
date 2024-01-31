import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const booleanAlwaysTrue = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:boolean|booleanU)$/u] > .arguments:first-child",
      typeIs: utils.TypeGroup.boolean
    }
  ]
});

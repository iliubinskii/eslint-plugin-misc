import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const symbolAlwaysFalse = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always false",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:symbol|symbolU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.symbol,
        utils.TypeGroup.unknown
      ]
    }
  ]
});

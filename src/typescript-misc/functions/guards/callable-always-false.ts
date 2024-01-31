import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const callableAlwaysFalse = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always false",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:callable|callableU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.function,
        utils.TypeGroup.object,
        utils.TypeGroup.unknown
      ]
    }
  ]
});

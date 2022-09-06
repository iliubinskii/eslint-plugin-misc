/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const numStrAlwaysFalse = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always false",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:numStr|numStrU)$/u] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.any,
        utils.TypeGroup.number,
        utils.TypeGroup.string,
        utils.TypeGroup.unknown
      ]
    }
  ]
});

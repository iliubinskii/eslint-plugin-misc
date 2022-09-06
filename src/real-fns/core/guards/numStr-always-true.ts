/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const numStrAlwaysTrue = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Always true",
      selector:
        "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:numStr|numStrU)$/u] > .arguments:first-child",
      typeIsOneOf: [utils.TypeGroup.number, utils.TypeGroup.string]
    }
  ]
});

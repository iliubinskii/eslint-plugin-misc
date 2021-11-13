/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const mixedFromIncludeNonArray = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Expecting type to include non-array",
      selector:
        "CallExpression[callee.object.name=a][callee.property.name=fromMixed] > .arguments:first-child",
      typeHasNoneOf: [
        utils.TypeGroup.boolean,
        utils.TypeGroup.function,
        utils.TypeGroup.number,
        utils.TypeGroup.object,
        utils.TypeGroup.string,
        utils.TypeGroup.symbol
      ]
    }
  ]
});

/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const fromIterableArgType = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary with array type",
      selector:
        "CallExpression[callee.object.name=a][callee.property.name=fromIterable] > .arguments:first-child",
      typeIs: utils.TypeGroup.array
    }
  ]
});

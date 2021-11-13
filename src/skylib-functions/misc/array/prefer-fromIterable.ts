/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferFromIterable = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.fromIterable" function instead',
      selector: "ArrayExpression[elements.length=1] > SpreadElement"
    }
  ]
});

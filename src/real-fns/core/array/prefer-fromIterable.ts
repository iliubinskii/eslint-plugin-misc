/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferFromIterable = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.fromIterable" function instead',
      selector: "ArrayExpression[elements.length=1] > SpreadElement"
    }
  ]
});

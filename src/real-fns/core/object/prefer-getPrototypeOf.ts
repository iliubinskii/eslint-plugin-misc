/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferGetPrototypeOf = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.getPrototypeOf" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=getPrototypeOf]"
    }
  ]
});

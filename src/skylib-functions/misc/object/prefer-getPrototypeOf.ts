/* eslint-disable @skylib/consistent-filename -- Postponed */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferGetPrototypeOf = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.getPrototypeOf" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=getPrototypeOf]"
    }
  ]
});

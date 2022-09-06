/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../utils";
import { core } from "../core";

export const preferUniqueIdFacade = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "uniqueId" facade instead',
      selector:
        "CallExpression > MemberExpression.callee[object.name=_][property.name=uniqueId]"
    }
  ]
});

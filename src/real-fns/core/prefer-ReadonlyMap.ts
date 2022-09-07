/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferReadonlyMap = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "ReadonlyMap" instead',
      selector: "NewExpression > Identifier.callee[name=Map]"
    }
  ]
});

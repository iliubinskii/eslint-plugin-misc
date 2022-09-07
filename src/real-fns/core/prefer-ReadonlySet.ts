/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferReadonlySet = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "ReadonlySet" instead',
      selector: "NewExpression > Identifier.callee[name=Set]"
    }
  ]
});

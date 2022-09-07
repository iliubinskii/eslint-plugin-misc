/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferSetInterval = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "programFlow.setInterval" function instead',
      selector: "CallExpression > .callee[name=setInterval]"
    }
  ]
});

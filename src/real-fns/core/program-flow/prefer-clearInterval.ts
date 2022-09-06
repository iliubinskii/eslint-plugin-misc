/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferClearInterval = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "programFlow.clearInterval" function instead',
      selector: "CallExpression > .callee[name=clearInterval]"
    }
  ]
});

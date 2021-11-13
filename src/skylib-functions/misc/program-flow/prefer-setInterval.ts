/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferSetInterval = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "programFlow.setInterval" function instead',
      selector: "CallExpression > .callee[name=setInterval]"
    }
  ]
});

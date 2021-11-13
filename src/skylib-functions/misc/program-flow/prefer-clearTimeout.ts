/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClearTimeout = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "programFlow.clearTimeout" function instead',
      selector: "CallExpression > .callee[name=clearTimeout]"
    }
  ]
});

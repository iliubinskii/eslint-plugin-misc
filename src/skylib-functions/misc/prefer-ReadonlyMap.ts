/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferReadonlyMap = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "ReadonlyMap" instead',
      selector: "NewExpression > Identifier.callee[name=Map]"
    }
  ]
});

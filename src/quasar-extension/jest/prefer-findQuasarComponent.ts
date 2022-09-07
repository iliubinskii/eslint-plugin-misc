/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferFindQuasarComponent = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "findQuasarComponent" function',
      selector:
        "CallExpression[arguments.0.name=/^Q/u] > MemberExpression.callee[object.name=wrapper][property.name=findComponent]"
    }
  ]
});

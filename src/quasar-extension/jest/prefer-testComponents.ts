/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferTestComponents = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "testComponents" instead',
      selector:
        "CallExpression[callee.object.name=wrapper][callee.property.name=findComponent] > MemberExpression.arguments:first-child > Identifier.object[name=components]"
    }
  ]
});

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferValues = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.values" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=values]"
    }
  ]
});

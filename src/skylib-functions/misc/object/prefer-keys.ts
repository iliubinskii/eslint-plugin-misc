import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferKeys = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.keys" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=keys]"
    }
  ]
});

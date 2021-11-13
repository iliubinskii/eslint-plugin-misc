import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferValues = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.values" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=values]"
    }
  ]
});

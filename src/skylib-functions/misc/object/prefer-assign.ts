import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferAssign = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.assign" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=assign]"
    }
  ]
});

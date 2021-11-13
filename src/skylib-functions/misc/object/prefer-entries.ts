import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferEntries = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.entries" function instead',
      selector:
        "CallExpression > .callee[object.name=Object][property.name=entries]"
    }
  ]
});

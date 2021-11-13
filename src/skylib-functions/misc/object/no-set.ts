import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noSet = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "reflect.set" function instead',
      selector:
        "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=set]"
    }
  ]
});

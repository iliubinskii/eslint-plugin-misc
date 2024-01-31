import * as utils from "../../../utils";
import { core } from "../../../core";

export const noSet = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "reflect.set" function instead',
      selector:
        "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=set]"
    }
  ]
});

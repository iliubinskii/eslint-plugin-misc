import * as utils from "../../../utils";
import { core } from "../../../core";

export const noGet = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "reflect.get" function instead',
      selector:
        "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=get]"
    }
  ]
});

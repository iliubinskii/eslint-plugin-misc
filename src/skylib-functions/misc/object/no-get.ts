import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noGet = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "reflect.get" function instead',
      selector:
        "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=get]"
    }
  ]
});

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const noSet = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      ignoreSelector: "CallExpression[callee.name=wrapProxyHandler] *",
      message: 'Use "o.set" function instead',
      selector:
        "CallExpression > .callee[object.name=reflect][property.name=set]"
    }
  ]
});

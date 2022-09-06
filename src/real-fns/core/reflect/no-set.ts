import * as utils from "../../../utils";
import { core } from "../../../core";

export const noSet = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      ignoreSelector: "CallExpression[callee.name=wrapProxyHandler] *",
      message: 'Use "o.set" function instead',
      selector:
        "CallExpression > .callee[object.name=reflect][property.name=set]"
    }
  ]
});

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferNumber = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "cast.number" function instead',
      selector: "CallExpression > .callee[name=Number]"
    }
  ]
});

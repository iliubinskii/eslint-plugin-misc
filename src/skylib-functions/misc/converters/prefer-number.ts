import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferNumber = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "cast.number" function instead',
      selector: "CallExpression > .callee[name=Number]"
    }
  ]
});

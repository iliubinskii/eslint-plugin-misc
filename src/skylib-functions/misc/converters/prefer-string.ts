import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferString = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "cast.string" function instead',
      selector: "CallExpression > .callee[name=String]"
    }
  ]
});

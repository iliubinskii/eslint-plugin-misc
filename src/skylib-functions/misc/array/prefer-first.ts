import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferFirst = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.first" function instead',
      selector:
        "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=0]"
    }
  ]
});

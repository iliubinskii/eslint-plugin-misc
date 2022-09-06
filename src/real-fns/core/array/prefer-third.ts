import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferThird = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.third" function instead',
      selector:
        "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=2]"
    }
  ]
});

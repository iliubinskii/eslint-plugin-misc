import * as utils from "../../utils";
import { misc } from "../../misc";

export const preferEvaluate = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "evaluate" function instead',
      selector:
        "CallExpression[arguments.length=0] > ArrowFunctionExpression.callee"
    }
  ]
});

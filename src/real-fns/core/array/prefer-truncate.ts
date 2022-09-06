import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const preferTruncate = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.truncate" function instead',
      selector:
        "AssignmentExpression[right.value=0] > MemberExpression.left[property.name=length] > .object",
      typeIs: utils.TypeGroup.array
    }
  ]
});

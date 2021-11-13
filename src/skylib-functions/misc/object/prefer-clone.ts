import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferClone = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "o.clone" function instead',
      selector: "ObjectExpression[properties.length=1] > SpreadElement"
    }
  ]
});

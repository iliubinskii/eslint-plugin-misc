import * as utils from "../../utils";
import { misc } from "../../misc";

export const noTemp = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Remove temp configuration",
      selector: "AssignmentExpression > ObjectExpression[properties.length>0]"
    }
  ]
});

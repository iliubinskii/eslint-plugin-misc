import * as utils from "../../utils";
import { core } from "../../core";

export const noTemp = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Remove temp configuration",
      selector: "AssignmentExpression > ObjectExpression[properties.length>0]"
    }
  ]
});

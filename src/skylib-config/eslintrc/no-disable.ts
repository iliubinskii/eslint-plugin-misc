import * as utils from "../../utils";
import { misc } from "../../misc";

export const noDisable = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Do not disable rules",
      selector: [
        "Property[key.name=rules] > ObjectExpression > Property > ArrayExpression > Literal:first-child[value=off]",
        "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
      ]
    }
  ]
});

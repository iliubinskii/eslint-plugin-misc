import * as utils from "../utils";
import { misc } from "../misc";

export const prettier = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Invalid prettier configuration",
      selector: [
        "ObjectExpression[properties.length!=4]",
        "Property:not([key.name=/^(?:arrowParens|endOfLine|quoteProps|trailingComma)$/u])",
        "Property[key.name=arrowParens]:not([value.value=avoid])",
        "Property[key.name=endOfLine]:not([value.value=lf])",
        "Property[key.name=quoteProps]:not([value.value=preserve])",
        "Property[key.name=trailingComma]:not([value.value=none])"
      ]
    }
  ]
});

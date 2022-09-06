import * as utils from "../utils";
import { base } from "./base";

export const preferArrowFunctionProperty = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Prefer arrow function",
      selector: "Property > FunctionExpression.value"
    }
  ],
  docs: {
    description: "Requires use of arrow functions.",
    failExamples: "const x = { f: function () {} };",
    passExamples: "const x = { f: () => {} };"
  }
});

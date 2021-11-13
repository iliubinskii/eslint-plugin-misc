import * as utils from "../utils";
import { core } from "./core";

export const preferArrowFunctionProperty = utils.wrapRule({
  rule: core["no-restricted-syntax"],
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

import * as utils from "../utils";
import { base } from "./base";

export const preferClassMethod = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "use of class method instead of function property",
      selector: "PropertyDefinition > ArrowFunctionExpression"
    }
  ],
  docs: {
    description:
      "Requires use of class methods instead of function properties.",
    failExamples: `
      class C {
        static f: () => {};
        g: () => {};
      }
    `,
    passExamples: `
      class C {
        static f() {}
        g() {}
      }
    `
  }
});

import * as utils from "../utils";
import { base } from "./base";

export const preferClassMethod = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "use of class method instead of function property",
      selector:
        "PropertyDefinition:not([typeAnnotation]) > ArrowFunctionExpression"
    }
  ],
  docs: {
    description:
      "Requires use of class methods instead of function properties.",
    failExamples: `
      class SampleClass {
        static f = () => {};
        g = () => {};
      }
    `,
    passExamples: `
      class SampleClass1 {
        static f: F = () => {};
        g: G = () => {};
      }

      class SampleClass2 {
        static f() {}
        g() {}
      }
    `
  }
});

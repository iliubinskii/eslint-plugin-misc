import * as utils from "../utils";
import { base } from "./base";
export const preferArrowFunctionProperty = utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
        {
            message: "Prefer arrow function",
            selector: "Property > FunctionExpression.value:not([params.0.name=this])"
        }
    ],
    docs: {
        description: "Requires use of arrow functions.",
        failExamples: `
      const x = {
        f() {},
        g: function () {}
      };
    `,
        passExamples: `
      const x = {
        f: () => {},
        g(this: void) {},
        h: function (this: void) {}
      };
    `
    }
});
//# sourceMappingURL=prefer-arrow-function-property.js.map
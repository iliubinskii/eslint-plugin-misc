import * as utils from "../utils";
import { base } from "./base";
export const requireThisVoid = utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
        {
            message: 'Add "this: void"',
            selector: "MethodDefinition[static=true] > FunctionExpression:not([params.0.name=this][params.0.typeAnnotation.typeAnnotation.type=TSVoidKeyword])"
        }
    ],
    docs: {
        description: 'Requires "this: void" for static methods.',
        failExamples: `
      class C {
        static f() {}
      }
    `,
        passExamples: `
      class C {
        static f(this: void) {}
      }
    `
    }
});
//# sourceMappingURL=require-this-void.js.map
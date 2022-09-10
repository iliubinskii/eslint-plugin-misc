"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireThisVoid = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.requireThisVoid = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classMethodsUseThis = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
exports.classMethodsUseThis = utils.wrapRule({
    rule: core_1.core.wrap,
    options: [
        {
            plugin: "eslint",
            rule: "class-methods-use-this",
            skip: [
                "FunctionExpression[params.0.name=this][params.0.typeAnnotation.typeAnnotation.type=TSVoidKeyword]",
                "MethodDefinition[kind=get] > FunctionExpression"
            ]
        }
    ],
    docs: {
        description: 'This rule wraps "class-methods-use-this" core rule, but skips methods with "this: void" argument.',
        failExamples: `
      class SampleClass {
        f() {}
      }
    `,
        passExamples: `
      class SampleClass {
        f(this: void) {}
      }
    `
    }
});
//# sourceMappingURL=class-methods-use-this.js.map
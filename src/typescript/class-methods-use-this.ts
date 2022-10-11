import * as utils from "../utils";
import { core } from "../core";

export const classMethodsUseThis = utils.wrapRule({
  rule: core.wrap,
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
    description:
      'This rule wraps "class-methods-use-this" core rule, but skips methods with "this: void" argument.',
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

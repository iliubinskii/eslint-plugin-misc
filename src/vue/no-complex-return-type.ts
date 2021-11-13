import * as utils from "../utils";
import { typescript } from "../typescript";

export const noComplexReturnType = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      checkReturnType: true,
      message: "Avoid complex return type",
      selector:
        ":not(MethodDefinition[kind=constructor], Property[key.name=setup]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
      typeIs: utils.TypeGroup.complex
    }
  ],
  docs: {
    description: "Disallow complex function return types.",
    failExamples: `
      function f() {
        return { x: 1 };
      }
    `,
    passExamples: `
      function f(): object {
        return { x: 1 };
      }

      export default defineComponent({
        setup: () => ({ x: 1 })
      });
    `
  }
});

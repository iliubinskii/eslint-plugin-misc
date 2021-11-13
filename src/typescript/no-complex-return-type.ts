import * as utils from "../utils";
import { core } from "./core";

export const noComplexReturnType = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      checkReturnType: true,
      message: "Avoid complex return type",
      selector:
        ":not(MethodDefinition[kind=constructor]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
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
    `
  }
});

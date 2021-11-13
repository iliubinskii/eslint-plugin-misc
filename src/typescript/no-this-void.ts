import * as utils from "../utils";
import { core } from "./core";

export const noThisVoid = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use arrow function instead of "this: void"',
      selector:
        "Identifier[name=this][typeAnnotation.typeAnnotation.type=TSVoidKeyword]"
    }
  ],
  docs: {
    description: 'Disallows "this: void" syntax.',
    failExamples: `
      class C {
        f(this: void) {}
      }
    `,
    passExamples: `
      class C {
        f: () => {}
      }
    `
  }
});

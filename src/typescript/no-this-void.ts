import * as utils from "../utils";
import { base } from "./base";

export const noThisVoid = utils.wrapRule({
  rule: base["no-restricted-syntax"],
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

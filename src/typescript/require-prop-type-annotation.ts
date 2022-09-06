import * as utils from "../utils";
import { base } from "./base";

export const requirePropTypeAnnotation = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Expecting type annotation",
      selector: "PropertyDefinition[typeAnnotation=undefined][value=null]"
    }
  ],
  docs: {
    description: "Requires type annotation for class properties.",
    failExamples: `
      class C {
        x;
      }
    `,
    passExamples: `
      class C {
        x: string;
        y = "";
      }
    `
  }
});

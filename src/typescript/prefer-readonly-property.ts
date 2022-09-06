import * as utils from "../utils";
import { base } from "./base";

export const preferReadonlyProperty = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Prefer readonly property",
      selector:
        ":matches(PropertyDefinition, TSPropertySignature)[readonly!=true]"
    }
  ],
  docs: {
    description: "Disallows writable properties.",
    failExamples: `
      class C {
        x: string;
      }
    `,
    passExamples: `
      class C {
        readonly x: string;
      }
    `
  }
});

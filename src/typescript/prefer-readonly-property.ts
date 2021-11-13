import * as utils from "../utils";
import { core } from "./core";

export const preferReadonlyProperty = utils.wrapRule({
  rule: core["no-restricted-syntax"],
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

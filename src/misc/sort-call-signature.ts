import * as utils from "../utils";
import { core } from "./core";

export const sortCallSignature = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Call signature should be first",
      selector: "TSInterfaceBody > TSCallSignatureDeclaration:not(:first-child)"
    }
  ],
  docs: {
    description: "Requires call signature to be first child.",
    failExamples: `
      interface I {
        x: string;
        (): string;
      }
    `,
    passExamples: `
      interface I {
        (): string;
        x: string;
      }
    `
  }
});

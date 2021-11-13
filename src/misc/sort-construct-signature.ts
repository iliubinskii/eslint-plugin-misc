import * as utils from "../utils";
import { core } from "./core";

export const sortConstructSignature = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Construct signature should be first",
      selector:
        "TSInterfaceBody > TSConstructSignatureDeclaration:not(:first-child)"
    }
  ],
  docs: {
    description: "Requires construct signature to be first child.",
    failExamples: `
      interface I {
        x: string;
        new (): string;
      }
    `,
    passExamples: `
      interface I {
        new (): string;
        x: string;
      }
    `
  }
});

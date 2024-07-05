import * as utils from "../utils";
import { base } from "./base";

export const noEmptyInterfaces = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Empty interface is not allowed",
      selector:
        "TSInterfaceDeclaration[body.body.length=0][extends.length=0] > Identifier"
    }
  ],
  docs: {
    description: "Disallow empty interfaces.",
    failExamples: "interface I {}",
    passExamples: `
      interface I {
        x: string;
      }
    `
  }
});

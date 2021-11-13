import * as utils from "../utils";
import { core } from "./core";

export const noEmptyInterfaces = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Empty interface is not allowed",
      selector:
        "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > Identifier"
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

import * as utils from "../utils";
import { core } from "./core";

export const preferEnum = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Use enum instead",
      selector: [
        "TSTypeAliasDeclaration[typeAnnotation.types.0.literal]",
        "TSTypeAliasDeclaration[typeAnnotation.types.1.literal]",
        "TSTypeAliasDeclaration[typeAnnotation.types.2.literal]"
      ],
      typeIs: utils.TypeGroup.string
    }
  ],
  docs: {
    description: "Requires using enums instead of string literals.",
    failExamples: 'type T = "a" | "b";',
    passExamples: `
      enum T {
        a = "a",
        b = "b"
      };
    `
  }
});

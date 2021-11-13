import * as utils from "../utils";
import { core } from "./core";

export const consistentArrayTypeName = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Prefer array type name to end with "s" or "Array" suffix',
      selector:
        "TSTypeAliasDeclaration > Identifier[name=/(?<![^s]s|Array)$/u]",
      typeIs: utils.TypeGroup.array
    }
  ],
  docs: {
    description: "Requires consistent array type name.",
    failExamples: `
      type Cat = string[];
      type Progress = string[];
    `,
    passExamples: `
      type Cats = string[];
      type CatArray = string[];
      type Progresses = string[];
      type ProgressArray = string[];
    `
  }
});

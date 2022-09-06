import * as utils from "../utils";
import { base } from "./base";

export const classMatchFilename = utils.wrapRule({
  rule: base["match-filename"],
  options: [
    {
      format: utils.Casing.pascalCase,
      selector: "ClassDeclaration > Identifier.id"
    }
  ],
  docs: {
    description: "Requires class name to match filename.",
    failExamples: `
      // filename: SomeName.ts
      export class ClassName {}
    `,
    passExamples: `
      // filename: ClassName.ts
      export class ClassName {}
    `
  }
});

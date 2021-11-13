import * as utils from "../utils";
import { core } from "./core";

export const noComplexDeclaratorType = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Avoid complex declarator type",
      selector: [
        "ExportDefaultDeclaration > .declaration",
        "VariableDeclarator[init.type=ArrayExpression] > Identifier.id[typeAnnotation=undefined]",
        "VariableDeclarator[init.type=ArrayExpression] > ArrayPattern > Identifier",
        "VariableDeclarator[init.type=ObjectExpression] > Identifier.id[typeAnnotation=undefined]",
        "VariableDeclarator[init.type=ObjectExpression] > ObjectPattern > Property > Identifier.value"
      ],
      typeIs: utils.TypeGroup.complex
    }
  ],
  docs: {
    description: "Disallow complex declarator types.",
    failExamples: "const x = { value: 1 };",
    passExamples: `
      const x = { value: 1 } as const;

      const y: object = { value: 1 };
    `
  }
});

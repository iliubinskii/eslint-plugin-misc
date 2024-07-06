import * as utils from "../utils";
import { base } from "./base";
export const noComplexDeclaratorType = utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
        {
            ignoreSelector: ["ExportDefaultDeclaration > Identifier"],
            message: "Either use 'as const' or add type definition to this declarator",
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
        description: "Requires either 'as const' or type definition complex declarators.",
        failExamples: "const x = { value: 1 };",
        passExamples: `
      const x = { value: 1 } as const;

      const y: object = { value: 1 };
    `
    }
});
//# sourceMappingURL=no-complex-declarator-type.js.map
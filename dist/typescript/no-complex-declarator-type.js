"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexDeclaratorType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noComplexDeclaratorType = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
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
//# sourceMappingURL=no-complex-declarator-type.js.map
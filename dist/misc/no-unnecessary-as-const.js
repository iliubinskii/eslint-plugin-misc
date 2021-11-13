"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryAsConst = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnnecessaryAsConst = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Unnecessary "as const"',
            selector: [
                "VariableDeclarator > TSAsExpression[expression.properties.length=0] > TSTypeReference > Identifier[name=const]",
                "VariableDeclarator[id.typeAnnotation] > TSAsExpression > TSTypeReference > Identifier[name=const]"
            ]
        }
    ],
    docs: {
        description: 'Disallows unnecessary "as const".',
        failExamples: `
      const x = {} as const;
      const y: I = { value: 1 } as const;
    `,
        passExamples: `
      const x = { value: 1 } as const;
    `
    }
});
//# sourceMappingURL=no-unnecessary-as-const.js.map
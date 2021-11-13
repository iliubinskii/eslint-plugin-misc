"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnderscoreExport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noUnderscoreExport = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "No underscore exports",
            selector: [
                "ExportNamedDeclaration > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature) > Identifier.id[name=/^_/u]",
                "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator > Identifier.id[name=/^_/u]"
            ]
        }
    ],
    docs: {
        description: "Disallows underscore export.",
        failExamples: `
      export const _x = 1;
      export function _f() {}

    `,
        passExamples: `
      export const x = 1;
      export function f() {}
    `
    }
});
//# sourceMappingURL=no-underscore-export.js.map
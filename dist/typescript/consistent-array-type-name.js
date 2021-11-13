"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentArrayTypeName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.consistentArrayTypeName = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Prefer array type name to end with "s" or "Array" suffix',
            selector: "TSTypeAliasDeclaration > Identifier[name=/(?<![^s]s|Array)$/u]",
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
//# sourceMappingURL=consistent-array-type-name.js.map
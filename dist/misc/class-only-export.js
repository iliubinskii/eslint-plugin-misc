"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classOnlyExport = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.classOnlyExport = utils.wrapRule({
    rule: core_1.core["prefer-only-export"],
    options: [
        { selector: "Program > ExportNamedDeclaration > ClassDeclaration" }
    ],
    docs: {
        description: "Requires class to be the only export.",
        failExamples: `
      export class SampleClass {}
      export const x = 1;
    `,
        passExamples: `
      export class SampleClass {}
    `
    }
});
//# sourceMappingURL=class-only-export.js.map
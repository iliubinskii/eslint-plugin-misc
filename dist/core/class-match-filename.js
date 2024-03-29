"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classMatchFilename = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.classMatchFilename = utils.wrapRule({
    rule: base_1.base["match-filename"],
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
//# sourceMappingURL=class-match-filename.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCallSignature = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.sortCallSignature = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Call signature should be first",
            selector: "TSInterfaceBody > TSCallSignatureDeclaration:not(:first-child)"
        }
    ],
    docs: {
        description: "Requires call signature to be first child.",
        failExamples: `
      interface I {
        x: string;
        (): string;
      }
    `,
        passExamples: `
      interface I {
        (): string;
        x: string;
      }
    `
    }
});
//# sourceMappingURL=sort-call-signature.js.map
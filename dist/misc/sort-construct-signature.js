"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortConstructSignature = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.sortConstructSignature = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Construct signature should be first",
            selector: "TSInterfaceBody > TSConstructSignatureDeclaration:not(:first-child)"
        }
    ],
    docs: {
        description: "Requires construct signature to be first child.",
        failExamples: `
      interface I {
        x: string;
        new (): string;
      }
    `,
        passExamples: `
      interface I {
        new (): string;
        x: string;
      }
    `
    }
});
//# sourceMappingURL=sort-construct-signature.js.map
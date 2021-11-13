"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEmptyInterfaces = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noEmptyInterfaces = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Empty interface is not allowed",
            selector: "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > Identifier"
        }
    ],
    docs: {
        description: "Disallow empty interfaces.",
        failExamples: `
      interface I {}
    `,
        passExamples: `
      interface I {
        x: string;
      }
    `
    }
});
//# sourceMappingURL=no-empty-interfaces.js.map
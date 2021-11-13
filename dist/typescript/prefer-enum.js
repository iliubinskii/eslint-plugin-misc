"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferEnum = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferEnum = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Use enum instead",
            selector: [
                "TSTypeAliasDeclaration[typeAnnotation.types.0.literal]",
                "TSTypeAliasDeclaration[typeAnnotation.types.1.literal]",
                "TSTypeAliasDeclaration[typeAnnotation.types.2.literal]"
            ],
            typeIs: utils.TypeGroup.string
        }
    ],
    docs: {
        description: "Requires using enums instead of string literals.",
        failExamples: `
      type T = "a" | "b";
    `,
        passExamples: `
      enum T {
        a = "a",
        b = "b"
      };
    `
    }
});
//# sourceMappingURL=prefer-enum.js.map
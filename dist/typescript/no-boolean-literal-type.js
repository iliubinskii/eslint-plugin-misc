"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noBooleanLiteralType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
exports.noBooleanLiteralType = (0, functions_1.evaluate)(() => {
    const prefix = "TSPropertySignature[optional=true] > TSTypeAnnotation > TSLiteralType.typeAnnotation";
    return utils.wrapRule({
        rule: core_1.core["no-restricted-syntax"],
        options: [
            {
                message: 'Use "boolean" type instead',
                selector: [
                    `${prefix} > Literal[value=true]`,
                    `${prefix} > Literal[value=false]`
                ]
            }
        ],
        docs: {
            description: "Disallows boolean literal type.",
            failExamples: `
        interface I {
          x?: true;
          y?: false;
        }
      `,
            passExamples: `
        interface I {
          x?: boolean;
        }
      `
        }
    });
});
//# sourceMappingURL=no-boolean-literal-type.js.map
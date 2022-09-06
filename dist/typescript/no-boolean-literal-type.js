"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noBooleanLiteralType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
const real_fns_1 = require("real-fns");
exports.noBooleanLiteralType = (0, real_fns_1.evaluate)(() => {
    const prefix = "TSPropertySignature[optional=true] > TSTypeAnnotation > TSLiteralType.typeAnnotation";
    return utils.wrapRule({
        rule: base_1.base["no-restricted-syntax"],
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
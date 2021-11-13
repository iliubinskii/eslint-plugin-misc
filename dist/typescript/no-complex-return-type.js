"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexReturnType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noComplexReturnType = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            checkReturnType: true,
            message: "Avoid complex return type",
            selector: ":not(MethodDefinition[kind=constructor]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
            typeIs: utils.TypeGroup.complex
        }
    ],
    docs: {
        description: "Disallow complex function return types.",
        failExamples: `
      function f() {
        return { x: 1 };
      }
    `,
        passExamples: `
      function f(): object {
        return { x: 1 };
      }
    `
    }
});
//# sourceMappingURL=no-complex-return-type.js.map
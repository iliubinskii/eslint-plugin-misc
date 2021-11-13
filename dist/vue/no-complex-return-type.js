"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComplexReturnType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const typescript_1 = require("../typescript");
exports.noComplexReturnType = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            checkReturnType: true,
            message: "Avoid complex return type",
            selector: ":not(MethodDefinition[kind=constructor], Property[key.name=setup]) > :matches(:function, TSDeclareFunction, TSFunctionType, TSMethodSignature)[returnType=undefined]",
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

      export default defineComponent({
        setup: () => ({ x: 1 })
      });
    `
    }
});
//# sourceMappingURL=no-complex-return-type.js.map
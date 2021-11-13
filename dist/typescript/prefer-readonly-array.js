"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlyArray = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly array",
            selector: [
                ":not(TSTypeOperator[operator=readonly]) > :matches(TSArrayType, TSTupleType)",
                "TSTypeReference > Identifier[name=Array]"
            ]
        }
    ],
    docs: {
        description: "Disallows writable arrays.",
        failExamples: `
      function f(x: string[]) {}
      function g(x: [string]) {}
      function h(x: Array<string>) {}
    `,
        passExamples: `
      function f(x: readonly string[]) {}
      function g(x: readonly [string]) {}
      function h(x: ReadonlyArray<string>) {}
    `
    }
});
//# sourceMappingURL=prefer-readonly-array.js.map
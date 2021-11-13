"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlySet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlySet = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly set",
            selector: "TSTypeReference > Identifier[name=Set]"
        }
    ],
    docs: {
        description: "Disallows writable sets.",
        failExamples: `
      function f(x: Set<string>) {}
    `,
        passExamples: `
      function f(x: ReadonlySet<string>) {}
    `
    }
});
//# sourceMappingURL=prefer-ReadonlySet.js.map
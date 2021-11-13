"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyMap = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.preferReadonlyMap = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly map",
            selector: "TSTypeReference > Identifier[name=Map]"
        }
    ],
    docs: {
        description: "Disallows writable maps.",
        failExamples: `
      function f(x: Map<string, string>) {}
    `,
        passExamples: `
      function f(x: ReadonlyMap<string, string>) {}
    `
    }
});
//# sourceMappingURL=prefer-ReadonlyMap.js.map
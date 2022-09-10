"use strict";
/* eslint-disable xss/no-mixed-html -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlySet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.preferReadonlySet = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly set",
            selector: "TSTypeReference > Identifier[name=Set]"
        }
    ],
    docs: {
        description: "Disallows writable sets.",
        failExamples: "function f(x: Set<string>) {}",
        passExamples: "function f(x: ReadonlySet<string>) {}"
    }
});
//# sourceMappingURL=prefer-readonly-set.js.map
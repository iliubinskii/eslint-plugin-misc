"use strict";
/* eslint-disable xss/no-mixed-html -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyMap = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.preferReadonlyMap = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Prefer readonly map",
            selector: "TSTypeReference > Identifier[name=Map]"
        }
    ],
    docs: {
        description: "Disallows writable maps.",
        failExamples: "function f(x: Map<string, string>) {}",
        passExamples: "function f(x: ReadonlyMap<string, string>) {}"
    }
});
//# sourceMappingURL=prefer-readonly-map.js.map
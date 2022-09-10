"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentSymbolDescription = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.consistentSymbolDescription = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Prefer kebab-case symbol description",
            selector: "CallExpression[callee.name=Symbol] > Literal:not([value=/^(?:[\\d\\-a-z]|__)+$/u])"
        }
    ],
    docs: {
        description: "Requires consistent symbol description.",
        failExamples: 'const x = Symbol("SampleDescription");',
        passExamples: 'const x = Symbol("kebab-case__kebab-case");'
    }
});
//# sourceMappingURL=consistent-symbol-description.js.map
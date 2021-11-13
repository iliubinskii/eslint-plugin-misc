"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettier = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.prettier = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Invalid prettier configuration",
            selector: [
                "ObjectExpression[properties.length!=4]",
                "Property:not([key.name=/^(?:arrowParens|endOfLine|quoteProps|trailingComma)$/u])",
                "Property[key.name=arrowParens]:not([value.value=avoid])",
                "Property[key.name=endOfLine]:not([value.value=lf])",
                "Property[key.name=quoteProps]:not([value.value=preserve])",
                "Property[key.name=trailingComma]:not([value.value=none])"
            ]
        }
    ]
});
//# sourceMappingURL=prettier.js.map
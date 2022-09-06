"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferLangVar = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferLangVar = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Use lang variable",
            selector: "VAttribute > VIdentifier.key[name=/^(?:alt|aria-label|aria-placeholder|aria-roledescription|aria-valuetext|caption|confirmation|label|placeholder|title|tooltip|validation-label)$/u]"
        }
    ]
});
//# sourceMappingURL=prefer-lang-var.js.map
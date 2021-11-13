"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noRules = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Rules section is disallowed",
            selector: "Property > Identifier.key[name=rules]"
        }
    ]
});
//# sourceMappingURL=no-rules.js.map
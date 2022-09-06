"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noRules = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Rules section is disallowed",
            selector: "Property > Identifier.key[name=rules]"
        }
    ]
});
//# sourceMappingURL=no-rules.js.map
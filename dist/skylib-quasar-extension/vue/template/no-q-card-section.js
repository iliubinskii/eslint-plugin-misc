"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQCardSection = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQCardSection = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-card-section" component instead',
            selector: "VElement[name=q-card-section]"
        }
    ]
});
//# sourceMappingURL=no-q-card-section.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQTooltip = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQTooltip = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-tooltip" component instead',
            selector: "VElement[name=q-tooltip]"
        }
    ]
});
//# sourceMappingURL=no-q-tooltip.js.map
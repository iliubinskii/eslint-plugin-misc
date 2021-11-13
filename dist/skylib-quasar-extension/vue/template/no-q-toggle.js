"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQToggle = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQToggle = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-toggle" component instead',
            selector: "VElement[name=q-toggle]"
        }
    ]
});
//# sourceMappingURL=no-q-toggle.js.map
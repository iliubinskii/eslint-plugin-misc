"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQSelect = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQSelect = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-select" component instead',
            selector: "VElement[name=q-select]"
        }
    ]
});
//# sourceMappingURL=no-q-select.js.map
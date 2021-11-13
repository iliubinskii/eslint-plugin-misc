"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQItem = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQItem = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-item" component instead',
            selector: "VElement[name=q-item]"
        }
    ]
});
//# sourceMappingURL=no-q-item.js.map
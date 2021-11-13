"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQBtn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQBtn = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-button" component instead',
            selector: "VElement[name=q-btn]"
        }
    ]
});
//# sourceMappingURL=no-q-btn.js.map
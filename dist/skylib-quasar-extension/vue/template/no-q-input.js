"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQInput = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQInput = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-input" component instead',
            selector: "VElement[name=q-input]"
        }
    ]
});
//# sourceMappingURL=no-q-input.js.map
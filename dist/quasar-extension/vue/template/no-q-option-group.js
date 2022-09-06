"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQOptionGroup = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQOptionGroup = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-option-group" component instead',
            selector: "VElement[name=q-option-group]"
        }
    ]
});
//# sourceMappingURL=no-q-option-group.js.map
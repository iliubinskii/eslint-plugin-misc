"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQSelect = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQSelect = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-select" component instead',
            selector: "VElement[name=q-select]"
        }
    ]
});
//# sourceMappingURL=no-q-select.js.map
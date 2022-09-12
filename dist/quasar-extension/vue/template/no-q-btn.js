"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQBtn = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQBtn = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-button" component instead',
            selector: "VElement[name=q-btn]"
        }
    ]
});
//# sourceMappingURL=no-q-btn.js.map
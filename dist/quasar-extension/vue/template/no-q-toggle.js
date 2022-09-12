"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQToggle = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQToggle = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-toggle" component instead',
            selector: "VElement[name=q-toggle]"
        }
    ]
});
//# sourceMappingURL=no-q-toggle.js.map
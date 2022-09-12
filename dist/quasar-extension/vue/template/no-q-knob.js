"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQKnob = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQKnob = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "e-knob" component instead',
            selector: "VElement[name=q-knob]"
        }
    ]
});
//# sourceMappingURL=no-q-knob.js.map
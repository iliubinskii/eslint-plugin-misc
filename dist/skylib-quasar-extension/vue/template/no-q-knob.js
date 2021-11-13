"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQKnob = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQKnob = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-knob" component instead',
            selector: "VElement[name=q-knob]"
        }
    ]
});
//# sourceMappingURL=no-q-knob.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQPopupProxy = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQPopupProxy = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-popup-proxy" component instead',
            selector: "VElement[name=q-popup-proxy]"
        }
    ]
});
//# sourceMappingURL=no-q-popup-proxy.js.map
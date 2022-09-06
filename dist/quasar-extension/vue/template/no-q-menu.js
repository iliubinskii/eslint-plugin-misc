"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQMenu = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQMenu = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-menu" component instead',
            selector: "VElement[name=q-menu]"
        }
    ]
});
//# sourceMappingURL=no-q-menu.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQCardActions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQCardActions = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-card-actions" component instead',
            selector: "VElement[name=q-card-actions]"
        }
    ]
});
//# sourceMappingURL=no-q-card-actions.js.map
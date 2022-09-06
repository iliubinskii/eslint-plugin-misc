"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQForm = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQForm = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-form" component instead',
            selector: "VElement[name=q-form]"
        }
    ]
});
//# sourceMappingURL=no-q-form.js.map
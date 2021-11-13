"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferLabelProp = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferLabelProp = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "label" prop instead',
            selector: [
                "VElement[name=/^(?:m-button|m-form-button|m-icon-button)$/u][children.length=1] > .children",
                "VElement[name=/^(?:m-button|m-form-button|m-icon-button)$/u][children.length=3][children.0.value=/^s+$/u][children.2.value=/^s+$/u] > .children"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-label-prop.js.map
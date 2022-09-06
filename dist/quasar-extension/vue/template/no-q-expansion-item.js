"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQExpansionItem = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noQExpansionItem = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-expansion-item" component instead',
            selector: "VElement[name=q-expansion-item]"
        }
    ]
});
//# sourceMappingURL=no-q-expansion-item.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noQCard = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noQCard = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "m-card" component instead',
            selector: "VElement[name=q-card]"
        }
    ]
});
//# sourceMappingURL=no-q-card.js.map
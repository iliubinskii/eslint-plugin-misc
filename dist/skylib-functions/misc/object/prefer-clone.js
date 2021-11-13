"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClone = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferClone = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.clone" function instead',
            selector: "ObjectExpression[properties.length=1] > SpreadElement"
        }
    ]
});
//# sourceMappingURL=prefer-clone.js.map
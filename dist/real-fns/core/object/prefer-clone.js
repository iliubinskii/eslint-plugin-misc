"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClone = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferClone = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.clone" function instead',
            selector: "ObjectExpression[properties.length=1] > SpreadElement"
        }
    ]
});
//# sourceMappingURL=prefer-clone.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferThird = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferThird = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.third" function instead',
            selector: "CallExpression[callee.object.name=a][callee.property.name=get] > Literal.arguments:nth-child(2)[value=2]"
        }
    ]
});
//# sourceMappingURL=prefer-third.js.map
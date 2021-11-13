"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyMap = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.preferReadonlyMap = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "ReadonlyMap" instead',
            selector: "NewExpression > Identifier.callee[name=Map]"
        }
    ]
});
//# sourceMappingURL=prefer-ReadonlyMap.js.map
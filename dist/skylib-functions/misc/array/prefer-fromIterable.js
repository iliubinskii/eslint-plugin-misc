"use strict";
/* eslint-disable @skylib/consistent-filename -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferFromIterable = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferFromIterable = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.fromIterable" function instead',
            selector: "ArrayExpression[elements.length=1] > SpreadElement"
        }
    ]
});
//# sourceMappingURL=prefer-fromIterable.js.map
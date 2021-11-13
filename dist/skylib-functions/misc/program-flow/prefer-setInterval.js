"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferSetInterval = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferSetInterval = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.setInterval" function instead',
            selector: "CallExpression > .callee[name=setInterval]"
        }
    ]
});
//# sourceMappingURL=prefer-setInterval.js.map
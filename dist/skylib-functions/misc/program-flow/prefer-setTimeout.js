"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferSetTimeout = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferSetTimeout = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.setTimeout" function instead',
            selector: "CallExpression > .callee[name=setTimeout]"
        }
    ]
});
//# sourceMappingURL=prefer-setTimeout.js.map
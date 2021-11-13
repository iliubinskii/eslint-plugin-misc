"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClearTimeout = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferClearTimeout = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.clearTimeout" function instead',
            selector: "CallExpression > .callee[name=clearTimeout]"
        }
    ]
});
//# sourceMappingURL=prefer-clearTimeout.js.map
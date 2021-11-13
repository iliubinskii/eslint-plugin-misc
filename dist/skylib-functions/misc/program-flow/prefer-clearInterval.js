"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClearInterval = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferClearInterval = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.clearInterval" function instead',
            selector: "CallExpression > .callee[name=clearInterval]"
        }
    ]
});
//# sourceMappingURL=prefer-clearInterval.js.map
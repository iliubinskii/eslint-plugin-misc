"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferSetInterval = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferSetInterval = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "programFlow.setInterval" function instead',
            selector: "CallExpression > .callee[name=setInterval]"
        }
    ]
});
//# sourceMappingURL=prefer-setInterval.js.map
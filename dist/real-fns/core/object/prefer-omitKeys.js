"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOmitKeys = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferOmitKeys = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.omitKeys" function instead',
            selector: "CallExpression > .callee[object.name=_][property.name=omit]"
        }
    ]
});
//# sourceMappingURL=prefer-omitKeys.js.map
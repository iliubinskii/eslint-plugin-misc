"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noGet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noGet = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "reflect.get" function instead',
            selector: "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=get]"
        }
    ]
});
//# sourceMappingURL=no-get.js.map
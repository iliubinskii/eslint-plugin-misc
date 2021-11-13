"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noGet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noGet = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "reflect.get" function instead',
            selector: "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=get]"
        }
    ]
});
//# sourceMappingURL=no-get.js.map
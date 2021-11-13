"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noSet = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "reflect.set" function instead',
            selector: "CallExpression[callee.name=wrapProxyHandler] CallExpression > .callee[object.name=o][property.name=set]"
        }
    ]
});
//# sourceMappingURL=no-set.js.map
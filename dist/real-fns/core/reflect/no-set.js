"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noSet = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            ignoreSelector: "CallExpression[callee.name=wrapProxyHandler] *",
            message: 'Use "o.set" function instead',
            selector: "CallExpression > .callee[object.name=reflect][property.name=set]"
        }
    ]
});
//# sourceMappingURL=no-set.js.map
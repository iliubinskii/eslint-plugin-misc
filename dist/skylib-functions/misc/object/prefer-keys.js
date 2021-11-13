"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferKeys = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferKeys = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.keys" function instead',
            selector: "CallExpression > .callee[object.name=Object][property.name=keys]"
        }
    ]
});
//# sourceMappingURL=prefer-keys.js.map
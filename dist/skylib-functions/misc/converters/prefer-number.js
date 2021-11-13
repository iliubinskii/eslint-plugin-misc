"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferNumber = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferNumber = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "cast.number" function instead',
            selector: "CallExpression > .callee[name=Number]"
        }
    ]
});
//# sourceMappingURL=prefer-number.js.map
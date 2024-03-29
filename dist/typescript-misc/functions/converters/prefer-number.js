"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferNumber = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferNumber = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "cast.number" function instead',
            selector: "CallExpression > .callee[name=Number]"
        }
    ]
});
//# sourceMappingURL=prefer-number.js.map
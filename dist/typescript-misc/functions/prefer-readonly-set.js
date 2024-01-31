"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlySet = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferReadonlySet = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "ReadonlySet" instead',
            selector: "NewExpression > Identifier.callee[name=Set]"
        }
    ]
});
//# sourceMappingURL=prefer-readonly-set.js.map
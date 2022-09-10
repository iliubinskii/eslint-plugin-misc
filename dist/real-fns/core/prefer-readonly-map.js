"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReadonlyMap = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferReadonlyMap = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "ReadonlyMap" instead',
            selector: "NewExpression > Identifier.callee[name=Map]"
        }
    ]
});
//# sourceMappingURL=prefer-readonly-map.js.map
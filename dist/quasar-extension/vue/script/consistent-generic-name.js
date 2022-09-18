"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentGenericName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.consistentGenericName = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary argument",
            selector: "Property[key.name=components] > ObjectExpression > Property[value.callee.name=/^generic[A-Z]/u] > Literal.key:not([value=/^e-[\\w-]+__[\\w-]+$/u])"
        }
    ]
});
//# sourceMappingURL=consistent-generic-name.js.map
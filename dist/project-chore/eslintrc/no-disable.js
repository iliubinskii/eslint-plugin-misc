"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noDisable = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noDisable = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Do not disable rules",
            selector: [
                "Property[key.name=rules] > ObjectExpression > Property > ArrayExpression > Literal:first-child[value=off]",
                "Property[key.name=rules] > ObjectExpression > Property > Literal.value[value=off]"
            ]
        }
    ]
});
//# sourceMappingURL=no-disable.js.map
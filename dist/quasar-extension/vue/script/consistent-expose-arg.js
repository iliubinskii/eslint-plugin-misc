"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentExposeArg = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.consistentExposeArg = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary argument",
            selector: "CallExpression[callee.name=expose] > ObjectExpression[properties.length=0]"
        }
    ]
});
//# sourceMappingURL=consistent-expose-arg.js.map
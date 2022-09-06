"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRefTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.requireRefTypeParam = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Missing type parameter",
            selector: "CallExpression[arguments.length=0][typeParameters=undefined] > Identifier.callee[name=ref]"
        }
    ]
});
//# sourceMappingURL=require-ref-type-param.js.map
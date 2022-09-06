"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireObjectTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.requireObjectTypeParam = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Missing type parameter",
            selector: "CallExpression[callee.object.object.name=is][callee.object.property.name=object][callee.property.name=/^(?:factory|of)$/][typeParameters=undefined]"
        }
    ]
});
//# sourceMappingURL=require-object-type-param.js.map
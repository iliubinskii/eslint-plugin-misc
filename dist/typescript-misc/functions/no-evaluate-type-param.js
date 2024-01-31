"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEvaluateTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noEvaluateTypeParam = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Move type definition to function",
            selector: "CallExpression[callee.name=evaluate] > TSTypeParameterInstantiation"
        }
    ]
});
//# sourceMappingURL=no-evaluate-type-param.js.map
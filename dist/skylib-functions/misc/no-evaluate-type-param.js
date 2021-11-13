"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEvaluateTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noEvaluateTypeParam = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Move type definition to function",
            selector: "CallExpression[callee.name=evaluate] > TSTypeParameterInstantiation"
        }
    ]
});
//# sourceMappingURL=no-evaluate-type-param.js.map
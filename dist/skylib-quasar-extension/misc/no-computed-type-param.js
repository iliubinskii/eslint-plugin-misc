"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noComputedTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noComputedTypeParam = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Move type definition to function",
            selector: "CallExpression[callee.name=computed] > TSTypeParameterInstantiation"
        }
    ]
});
//# sourceMappingURL=no-computed-type-param.js.map
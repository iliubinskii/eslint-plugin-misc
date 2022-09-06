"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRefTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noRefTypeParam = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary type parameter",
            selector: "CallExpression[callee.name=ref][arguments.0.type=Literal] > TSTypeParameterInstantiation > :matches(TSBooleanKeyword, TSNumberKeyword, TSStringKeyword)"
        }
    ]
});
//# sourceMappingURL=no-ref-type-param.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMixedClasses = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noMixedClasses = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Do not mix module and static classes",
            selector: "VExpressionContainer > TemplateLiteral > MemberExpression > Identifier[name=$style]"
        }
    ]
});
//# sourceMappingURL=no-mixed-classes.js.map
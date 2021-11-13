"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMixedClasses = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noMixedClasses = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Do not mix module and static classes",
            selector: "VExpressionContainer > TemplateLiteral > MemberExpression > Identifier[name=$style]"
        }
    ]
});
//# sourceMappingURL=no-mixed-classes.js.map
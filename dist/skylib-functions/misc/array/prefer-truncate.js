"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferTruncate = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.preferTruncate = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.truncate" function instead',
            selector: "AssignmentExpression[right.value=0] > MemberExpression.left[property.name=length] > .object",
            typeIs: utils.TypeGroup.array
        }
    ]
});
//# sourceMappingURL=prefer-truncate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noTemp = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noTemp = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Remove temp configuration",
            selector: "AssignmentExpression > ObjectExpression[properties.length>0]"
        }
    ]
});
//# sourceMappingURL=no-temp.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noArrayArg = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.noArrayArg = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Do not use with array type",
            selector: "CallExpression[callee.object.name=o][callee.property.name=/^(?:entries|keys|values)$/u] > .arguments:first-child",
            typeIs: utils.TypeGroup.array
        }
    ]
});
//# sourceMappingURL=no-array-arg.js.map
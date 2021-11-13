"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.symbolAlwaysTrue = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always true",
            selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:symbol|symbolU)$/u] > .arguments:first-child",
            typeIs: utils.TypeGroup.symbol
        }
    ]
});
//# sourceMappingURL=symbol-always-true.js.map
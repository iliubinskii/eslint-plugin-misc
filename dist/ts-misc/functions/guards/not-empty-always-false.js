"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notEmptyAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.notEmptyAlwaysFalse = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always false",
            selector: "CallExpression[callee.object.object.name=/^(?:as|assert|is)$/u][callee.object.property.name=not][callee.property.name=empty] > .arguments:first-child",
            typeIsOneOf: [utils.TypeGroup.null, utils.TypeGroup.undefined]
        }
    ]
});
//# sourceMappingURL=not-empty-always-false.js.map
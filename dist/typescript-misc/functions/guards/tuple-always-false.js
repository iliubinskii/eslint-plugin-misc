"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tupleAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.tupleAlwaysFalse = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always false",
            selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:tuple|tupleU)$/u] > .arguments:first-child",
            typeHasNoneOf: [
                utils.TypeGroup.any,
                utils.TypeGroup.arrayOrTuple,
                utils.TypeGroup.unknown
            ]
        }
    ]
});
//# sourceMappingURL=tuple-always-false.js.map
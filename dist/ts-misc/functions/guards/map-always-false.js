"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAlwaysFalse = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.mapAlwaysFalse = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always false",
            selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:map|mapU)$/u] > .arguments:first-child",
            typeHasNoneOf: [
                utils.TypeGroup.any,
                utils.TypeGroup.object,
                utils.TypeGroup.unknown
            ]
        }
    ]
});
//# sourceMappingURL=map-always-false.js.map
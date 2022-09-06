"use strict";
/* eslint-disable @skylib/consistent-filename -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexedObjectAlwaysTrue = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.indexedObjectAlwaysTrue = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Always true",
            selector: "CallExpression[callee.object.name=/^(?:as|assert|is)$/u][callee.property.name=/^(?:indexedObject|indexedObjectU)$/u] > .arguments:first-child",
            typeIs: utils.TypeGroup.object
        }
    ]
});
//# sourceMappingURL=indexedObject-always-true.js.map
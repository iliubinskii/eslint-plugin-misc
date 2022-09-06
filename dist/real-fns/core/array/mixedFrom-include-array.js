"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixedFromIncludeArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.mixedFromIncludeArray = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Expecting type to include array",
            selector: "CallExpression[callee.object.name=a][callee.property.name=fromMixed] > .arguments:first-child",
            typeHasNoneOf: [utils.TypeGroup.array]
        }
    ]
});
//# sourceMappingURL=mixedFrom-include-array.js.map
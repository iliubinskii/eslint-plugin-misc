"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromIterableArgType = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.fromIterableArgType = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary with array type",
            selector: "CallExpression[callee.object.name=a][callee.property.name=fromIterable] > .arguments:first-child",
            typeIs: utils.TypeGroup.array
        }
    ]
});
//# sourceMappingURL=fromIterable-arg-type.js.map
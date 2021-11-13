"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferUniqueIdFacade = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.preferUniqueIdFacade = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "uniqueId" facade instead',
            selector: "CallExpression > MemberExpression.callee[object.name=_][property.name=uniqueId]"
        }
    ]
});
//# sourceMappingURL=prefer-uniqueId-facade.js.map
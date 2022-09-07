"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferUniqueIdFacade = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
exports.preferUniqueIdFacade = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "uniqueId" facade instead',
            selector: "CallExpression > MemberExpression.callee[object.name=_][property.name=uniqueId]"
        }
    ]
});
//# sourceMappingURL=prefer-uniqueId-facade.js.map
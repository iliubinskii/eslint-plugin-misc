"use strict";
/* eslint-disable @skylib/consistent-filename -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferHasOwnProp = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferHasOwnProp = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "o.hasOwnProp" function instead',
            selector: "CallExpression > .callee[object.object.object.name=Object][object.object.property.name=prototype][object.property.name=hasOwnProperty][property.name=call]"
        }
    ]
});
//# sourceMappingURL=prefer-hasOwnProp.js.map
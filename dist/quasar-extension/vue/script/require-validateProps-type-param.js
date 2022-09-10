"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireValidatePropsTypeParam = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
// eslint-disable-next-line misc/max-identifier-blocks -- Ok
exports.requireValidatePropsTypeParam = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Expecting "OwnProps" type parameter',
            selector: [
                "CallExpression[callee.name=validateProps] > TSTypeParameterInstantiation > TSTypeReference > TSQualifiedName.typeName > Identifier.right[name!=OwnProps]",
                "CallExpression[callee.name=validateProps][typeParameters=undefined]"
            ]
        }
    ]
});
//# sourceMappingURL=require-validateProps-type-param.js.map
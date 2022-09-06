"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferUndefinedShorthandTypeName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
exports.preferUndefinedShorthandTypeName = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "...U" type instead',
            selector: [
                "TSUnionType[types.0.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.1.type=TSUndefinedKeyword]",
                "TSUnionType[types.0.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.typeName.name=/^(?:NumStr|PropertyKey)$/u][types.1.type=TSUndefinedKeyword]"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-undefined-shorthand-typeName.js.map
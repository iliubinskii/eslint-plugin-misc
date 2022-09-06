"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferUndefinedShorthandLiteral = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferUndefinedShorthandLiteral = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "...U" type instead',
            selector: [
                "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
                "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-undefined-shorthand-literal.js.map
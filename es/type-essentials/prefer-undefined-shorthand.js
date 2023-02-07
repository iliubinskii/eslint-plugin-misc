import * as utils from "../utils";
import { core } from "../core";
export const preferUndefinedShorthand = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "...U" type instead',
            selector: [
                "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
                "TSUnionType[types.0.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.literal.raw=/(?:false|true)/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.literal.raw=/(?:false|true)/u][types.1.type=TSUndefinedKeyword]",
                //
                "TSUnionType[types.0.type=/^(?:TSBooleanKeyword|TSNullKeyword|TSNumberKeyword|TSObjectKeyword|TSStringKeyword)$/u][types.1.type=TSUndefinedKeyword]",
                "TSUnionType[types.0.type=/^(?:TSBooleanKeyword|TSNullKeyword|TSNumberKeyword|TSObjectKeyword|TSStringKeyword)$/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.type=/^(?:TSBooleanKeyword|TSNullKeyword|TSNumberKeyword|TSObjectKeyword|TSStringKeyword)$/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.1.type=/^(?:TSBooleanKeyword|TSNullKeyword|TSNumberKeyword|TSObjectKeyword|TSStringKeyword)$/u][types.2.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.type=/^(?:TSBooleanKeyword|TSNullKeyword|TSNumberKeyword|TSObjectKeyword|TSStringKeyword)$/u][types.0.type=TSUndefinedKeyword]",
                "TSUnionType[types.2.type=/^(?:TSBooleanKeyword|TSNullKeyword|TSNumberKeyword|TSObjectKeyword|TSStringKeyword)$/u][types.1.type=TSUndefinedKeyword]",
                //
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
//# sourceMappingURL=prefer-undefined-shorthand.js.map
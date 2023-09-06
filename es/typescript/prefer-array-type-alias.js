import * as utils from "../utils";
import { base } from "./base";
export const preferArrayTypeAlias = utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
        {
            checkArrayType: true,
            ignoreSelector: [
                "TSTypeAliasDeclaration > .typeAnnotation",
                "TSTypeAliasDeclaration > .typeAnnotation *"
            ],
            message: "Prefer alias for array type",
            selector: [
                "TSArrayType",
                "TSTupleType[elementTypes.length>0]",
                "TSTypeReference[typeName.name=Array]",
                "TSTypeReference[typeName.name=ReadonlyArray]"
            ],
            typeIsNoneOf: [utils.TypeGroup.any, utils.TypeGroup.parameter]
        }
    ],
    docs: {
        description: "Prefer alias for array type.",
        failExamples: "function f(x: readonly string[]) {}",
        passExamples: `
      type strings = readonly string[];
      function f(x: strings) {}
    `
    }
});
//# sourceMappingURL=prefer-array-type-alias.js.map
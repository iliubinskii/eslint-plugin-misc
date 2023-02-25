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
        description: 'Disallows unsafe "Object.assign".',
        failExamples: `
      const x = { value: 1 } as const;

      Object.assign(x, { value: 2 });
    `,
        passExamples: `
      const x = { value: 1 };

      Object.assign(x, { value: 2 });
    `
    }
});
//# sourceMappingURL=prefer-array-type-alias.js.map
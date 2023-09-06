"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferArrayTypeAlias = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.preferArrayTypeAlias = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
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
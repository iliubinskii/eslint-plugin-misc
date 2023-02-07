import * as utils from "../../utils";
import { core } from "../../core";
export const noRefUndefined = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Unnecessary "undefined"',
            selector: [
                "CallExpression[callee.name=ref] > Identifier.arguments[name=undefined]",
                "CallExpression[callee.name=ref][arguments.length=0] > TSTypeParameterInstantiation > TSTypeReference > Identifier.typeName[name=/U$/u]",
                "CallExpression[callee.name=ref][arguments.length=0] > TSTypeParameterInstantiation > TSUnionType > TSUndefinedKeyword"
            ]
        }
    ]
});
//# sourceMappingURL=no-ref-undefined.js.map
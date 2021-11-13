import * as utils from "../../utils";
import { misc } from "../../misc";

export const noRefUndefined = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
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

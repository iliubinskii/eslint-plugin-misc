import * as utils from "../utils";
import { core } from "../core";
export const noTsToolbelt = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "type-essentials" type instead',
            selector: [
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/FilterKeys]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Optional]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/OptionalKeys]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Readonly]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/ReadonlyKeys]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Required]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/RequiredKeys]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/Writable]",
                "ImportDeclaration > Literal.source[value=ts-toolbelt/out/Object/WritableKeys]"
            ]
        }
    ]
});
//# sourceMappingURL=no-ts-toolbelt.js.map
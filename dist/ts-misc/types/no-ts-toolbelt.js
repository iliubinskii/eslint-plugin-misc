"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noTsToolbelt = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noTsToolbelt = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const typescript_misc_1 = require("typescript-misc");
const core_1 = require("./core");
const typescript_1 = require("./typescript");
const coreAll = {
    ...rules(core_1.core),
    "misc/match-filename": "off",
    "misc/no-restricted-syntax": "off",
    "misc/require-syntax": "off",
    "misc/wrap": "off"
};
const coreRecommended = {
    ...coreAll,
    "misc/consistent-filename": "off",
    "misc/consistent-source-extension": "off",
    "misc/export-matching-filename-only": "off",
    "misc/max-identifier-blocks": "off",
    "misc/no-at-sign-import": "off",
    "misc/no-internal-modules": "off",
    "misc/no-negated-conditions": "off",
    "misc/no-relative-parent-import": "off",
    "misc/no-sibling-import": "off",
    "misc/object-format": "off",
    "misc/only-export-name": "off"
};
const typescriptAll = {
    ...rules(typescript_1.typescript),
    "misc/typescript/no-restricted-syntax": "off"
};
const typescriptRecommended = {
    ...typescriptAll,
    "misc/typescript/array-callback-return-type": "off",
    "misc/typescript/no-complex-return-type": "off",
    "misc/typescript/no-multi-type-tuples": "off",
    "misc/typescript/prefer-array-type-alias": "off",
    "misc/typescript/prefer-enum": "off"
};
exports.configs = {
    "all": {
        overrides: [
            {
                files: ["*.ts", "*.tsx"],
                rules: typescriptAll
            }
        ],
        rules: coreAll
    },
    "core-all": { rules: coreAll },
    "core-recommended": { rules: coreRecommended },
    "recommended": {
        overrides: [
            {
                files: ["*.ts", "*.tsx"],
                rules: typescriptRecommended
            }
        ],
        rules: coreRecommended
    },
    "typescript-all": { rules: typescriptAll },
    "typescript-recommended": { rules: typescriptRecommended }
};
/**
 * Converts rules to configuration.
 * @param source - Source.
 * @param filter - Filter.
 * @returns Configuration.
 */
function rules(source, filter = typescript_misc_1.fn.noopTrue) {
    return typescript_misc_1.o.fromEntries(typescript_misc_1.o
        .keys(source)
        .map(key => `misc/${key}`)
        .filter(filter)
        .map(name => [name, "error"]));
}
//# sourceMappingURL=configs.js.map
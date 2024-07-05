"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const typescript_misc_1 = require("typescript-misc");
const core_1 = require("./core");
const typescript_1 = require("./typescript");
const coreRules = {
    ...rules(core_1.core),
    "misc/match-filename": "off",
    "misc/no-restricted-syntax": "off",
    "misc/require-syntax": "off",
    "misc/wrap": "off"
};
const typescriptRules = {
    ...rules(typescript_1.typescript),
    "misc/typescript/no-restricted-syntax": "off"
};
exports.configs = {
    all: {
        overrides: [{ files: ["*.ts", "*.tsx"], rules: typescriptRules }],
        rules: coreRules
    },
    core: { rules: coreRules },
    typescript: { rules: typescriptRules }
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
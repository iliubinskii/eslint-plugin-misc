"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const typescript_misc_1 = require("typescript-misc");
const core_1 = require("./core");
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const project_chore_1 = require("./project-chore");
const typescript_1 = require("./typescript");
const typescript_misc_2 = require("./typescript-misc");
exports.configs = (0, typescript_misc_1.evaluate)(() => {
    const coreRules = {
        ...rules(core_1.core),
        "misc/match-filename": "off",
        "misc/no-restricted-syntax": "off",
        "misc/require-syntax": "off",
        "misc/wrap": "off"
    };
    const eslintrcRules = rules(eslintrc_1.eslintrc);
    const jestRules = rules(jest_1.jest);
    const typescriptRules = {
        ...rules(typescript_1.typescript),
        "misc/typescript/no-restricted-syntax": "off"
    };
    return {
        "all": {
            overrides: [
                { files: ["*.ts", "*.tsx"], rules: typescriptRules },
                { files: "./tests/**", rules: jestRules },
                { files: ".eslintrc.js", rules: eslintrcRules }
            ],
            rules: coreRules
        },
        "core": { rules: coreRules },
        "eslintrc": { rules: eslintrcRules },
        "jest": { rules: jestRules },
        "project-chore": { rules: rules(project_chore_1.projectChore) },
        "typescript": { rules: typescriptRules },
        "typescript-misc": {
            overrides: [
                {
                    files: "./tests/**",
                    rules: rules(typescript_misc_2.typescriptMisc, name => name.startsWith("misc/typescript-misc/jest/"))
                }
            ],
            rules: rules(typescript_misc_2.typescriptMisc, name => !name.startsWith("misc/typescript-misc/jest/"))
        }
    };
});
/**
 * Converts rules to configuration.
 *
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
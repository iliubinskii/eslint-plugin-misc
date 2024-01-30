"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const real_fns_1 = require("real-fns");
const core_1 = require("./core");
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const project_chore_1 = require("./project-chore");
const ts_misc_1 = require("./ts-misc");
const typescript_1 = require("./typescript");
exports.configs = (0, real_fns_1.evaluate)(() => {
    const coreRules = Object.assign(Object.assign({}, rules(core_1.core)), { "misc/match-filename": "off", "misc/no-restricted-syntax": "off", "misc/require-syntax": "off", "misc/wrap": "off" });
    const eslintrcRules = rules(eslintrc_1.eslintrc);
    const jestRules = rules(jest_1.jest);
    const typescriptRules = Object.assign(Object.assign({}, rules(typescript_1.typescript)), { "misc/typescript/no-restricted-syntax": "off" });
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
        "ts-misc": {
            overrides: [
                {
                    files: "./tests/**",
                    rules: rules(ts_misc_1.tsMisc, name => name.startsWith("misc/ts-misc/jest/"))
                }
            ],
            rules: rules(ts_misc_1.tsMisc, name => !name.startsWith("misc/ts-misc/jest/"))
        },
        "typescript": { rules: typescriptRules }
    };
});
/**
 * Converts rules to configuration.
 *
 * @param source - Source.
 * @param filter - Filter.
 * @returns Configuration.
 */
function rules(source, filter = real_fns_1.fn.noopTrue) {
    return real_fns_1.o.fromEntries(real_fns_1.o
        .keys(source)
        .map(key => `misc/${key}`)
        .filter(filter)
        .map(name => [name, "error"]));
}
//# sourceMappingURL=configs.js.map
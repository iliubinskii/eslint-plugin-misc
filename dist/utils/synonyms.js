"use strict";
/* eslint-disable @typescript-eslint/no-var-requires -- Ok */
/* eslint-disable global-require -- Ok */
/* eslint-disable import/no-dynamic-require -- Ok */
/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */
/* eslint-disable security/detect-non-literal-require -- Ok */
/* eslint-disable unicorn/prefer-module -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSynonyms = getSynonyms;
const tslib_1 = require("tslib");
const typescript_misc_1 = require("typescript-misc");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * Creates synonyms.
 * @param config - Path to synonyms configuration.
 * @param core - Core rules.
 * @returns Synonyms.
 */
function getSynonyms(config, core) {
    if (node_fs_1.default.existsSync(config)) {
        const items = typescript_misc_1.o.entries(core).map(([name, rule]) => {
            return { name, rule };
        });
        const synonyms = require(node_fs_1.default.realpathSync(config));
        typescript_misc_1.assert.array.of(synonyms, typescript_misc_1.is.string, "Expecting array of strings");
        const entries = synonyms
            .map((synonym) => {
            const item = items.find(({ name }) => synonym.startsWith(`misc/${name}/`));
            return item ? [synonym.slice(5), item.rule] : undefined;
        })
            .filter(typescript_misc_1.is.not.empty);
        return typescript_misc_1.o.fromEntries(entries);
    }
    return {};
}
//# sourceMappingURL=synonyms.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSynonyms = void 0;
const tslib_1 = require("tslib");
const real_fns_1 = require("real-fns");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * Creates synonyms.
 *
 * @param config - Path to synonyms configuration.
 * @param core - Core rules.
 * @returns Synonyms.
 */
// eslint-disable-next-line misc/only-export-name -- Ok
function getSynonyms(config, core) {
    if (node_fs_1.default.existsSync(config)) {
        const items = real_fns_1.o.entries(core).map(([name, rule]) => ({ name, rule }));
        const synonyms = require(node_fs_1.default.realpathSync(config));
        real_fns_1.assert.array.of(synonyms, real_fns_1.is.string, "Expecting array of strings");
        const entries = synonyms
            .map((synonym) => {
            const item = items.find(({ name }) => synonym.startsWith(`misc/${name}/`));
            return item ? [synonym.slice(5), item.rule] : undefined;
        })
            .filter(real_fns_1.is.not.empty);
        return real_fns_1.o.fromEntries(entries);
    }
    return {};
}
exports.getSynonyms = getSynonyms;
//# sourceMappingURL=synonyms.js.map
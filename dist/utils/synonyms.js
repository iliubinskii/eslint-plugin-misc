"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSynonyms = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
/**
 * Creates synonyms object.
 *
 * @param config - Path to synonyms configuration.
 * @param core - Core rules.
 * @returns Synonyms object.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
function getSynonyms(config, core) {
    if (node_fs_1.default.existsSync(config)) {
        const items = functions_1.o.entries(core).map(([name, rule]) => ({ name, rule }));
        const synonyms = require(node_fs_1.default.realpathSync(config));
        functions_1.assert.array.of(synonyms, functions_1.is.string, "Expecting array of strings");
        const entries = synonyms
            .map((synonym) => {
            const item = items.find(({ name }) => synonym.startsWith(`@skylib/${name}/`));
            return item ? [synonym.slice(8), item.rule] : undefined;
        })
            .filter(functions_1.is.not.empty);
        return functions_1.o.fromEntries(entries);
    }
    return {};
}
exports.getSynonyms = getSynonyms;
//# sourceMappingURL=synonyms.js.map
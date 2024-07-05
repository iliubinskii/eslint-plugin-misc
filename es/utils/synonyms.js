/* eslint-disable @typescript-eslint/no-var-requires -- Ok */
/* eslint-disable global-require -- Ok */
/* eslint-disable import/no-dynamic-require -- Ok */
/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */
/* eslint-disable security/detect-non-literal-require -- Ok */
/* eslint-disable unicorn/prefer-module -- Ok */
import { assert, is, o } from "typescript-misc";
import fs from "node:fs";
/**
 * Creates synonyms.
 *
 * @param config - Path to synonyms configuration.
 * @param core - Core rules.
 * @returns Synonyms.
 */
export function getSynonyms(config, core) {
    if (fs.existsSync(config)) {
        const items = o.entries(core).map(([name, rule]) => ({ name, rule }));
        const synonyms = require(fs.realpathSync(config));
        assert.array.of(synonyms, is.string, "Expecting array of strings");
        const entries = synonyms
            .map((synonym) => {
            const item = items.find(({ name }) => synonym.startsWith(`misc/${name}/`));
            return item ? [synonym.slice(5), item.rule] : undefined;
        })
            .filter(is.not.empty);
        return o.fromEntries(entries);
    }
    return {};
}
//# sourceMappingURL=synonyms.js.map
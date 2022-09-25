import type { Entry, IndexedRecord } from "type-essentials";
import { assert, is, o } from "real-fns";
import fs from "node:fs";

/**
 * Creates synonyms.
 *
 * @param config - Path to synonyms configuration.
 * @param core - Core rules.
 * @returns Synonyms.
 */
// eslint-disable-next-line misc/only-export-name -- Ok
export function getSynonyms(
  config: string,
  core: IndexedRecord
): IndexedRecord {
  if (fs.existsSync(config)) {
    const items = o.entries(core).map(([name, rule]): Item => ({ name, rule }));

    const synonyms: unknown = require(fs.realpathSync(config));

    assert.array.of(synonyms, is.string, "Expecting array of strings");

    const entries = synonyms
      .map((synonym): Entry<string, unknown> | undefined => {
        const item = items.find(({ name }) =>
          synonym.startsWith(`misc/${name}/`)
        );

        return item ? [synonym.slice(5), item.rule] : undefined;
      })
      .filter(is.not.empty);

    return o.fromEntries(entries);
  }

  return {};

  interface Item {
    readonly name: string;
    readonly rule: unknown;
  }
}

import type { Entry, IndexedRecord } from "@skylib/functions";
import { assert, is, o } from "@skylib/functions";
import fs from "node:fs";

/**
 * Creates synonyms object.
 *
 * @param config - Path to synonyms configuration.
 * @param core - Core rules.
 * @returns Synonyms object.
 */
// eslint-disable-next-line @skylib/only-export-name -- Ok
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
          synonym.startsWith(`@skylib/${name}/`)
        );

        return item ? [synonym.slice(8), item.rule] : undefined;
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

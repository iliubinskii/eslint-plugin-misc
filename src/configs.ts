import { fn, o } from "typescript-misc";
import type { IndexedRecord } from "typescript-misc";
import { core } from "./core";
import { typescript } from "./typescript";

const coreRules = {
  ...rules(core),
  "misc/match-filename": "off",
  "misc/no-restricted-syntax": "off",
  "misc/require-syntax": "off",
  "misc/wrap": "off"
} as const;

const typescriptRules = {
  ...rules(typescript),
  "misc/typescript/no-restricted-syntax": "off"
} as const;

export const configs = {
  all: {
    overrides: [{ files: ["*.ts", "*.tsx"], rules: typescriptRules }],
    rules: coreRules
  },
  core: { rules: coreRules },
  typescript: { rules: typescriptRules }
} as const;

/**
 * Converts rules to configuration.
 * @param source - Source.
 * @param filter - Filter.
 * @returns Configuration.
 */
function rules(
  source: IndexedRecord,
  filter: (name: string) => boolean = fn.noopTrue
): IndexedRecord {
  return o.fromEntries(
    o
      .keys(source)
      .map(key => `misc/${key}`)
      .filter(filter)
      .map(name => [name, "error"])
  );
}

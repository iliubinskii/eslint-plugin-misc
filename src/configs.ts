import { fn, o } from "typescript-misc";
import type { IndexedRecord } from "typescript-misc";
import { core } from "./core";
import { typescript } from "./typescript";

const coreAll = {
  ...rules(core),
  "misc/match-filename": "off",
  "misc/no-restricted-syntax": "off",
  "misc/require-syntax": "off",
  "misc/wrap": "off"
} as const;

const coreRecommended = {
  ...coreAll,
  "misc/consistent-filename": "off",
  "misc/consistent-source-extension": "off",
  "misc/export-matching-filename-only": "off",
  "misc/max-identifier-blocks": "off",
  "misc/no-at-sign-import": "off",
  "misc/no-internal-modules": "off",
  "misc/no-negated-conditions": "off",
  "misc/no-relative-parent-import": "off",
  "misc/no-sibling-import": "off",
  "misc/object-format": "off",
  "misc/only-export-name": "off"
} as const;

const typescriptAll = {
  ...rules(typescript),
  "misc/typescript/no-restricted-syntax": "off"
} as const;

const typescriptRecommended = {
  ...typescriptAll,
  "misc/typescript/array-callback-return-type": "off",
  "misc/typescript/no-complex-return-type": "off",
  "misc/typescript/no-multi-type-tuples": "off",
  "misc/typescript/prefer-array-type-alias": "off",
  "misc/typescript/prefer-enum": "off"
} as const;

export const configs = {
  "all": {
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: typescriptAll
      }
    ],
    rules: coreAll
  },
  "core-all": { rules: coreAll },
  "core-recommended": { rules: coreRecommended },
  "recommended": {
    overrides: [
      {
        files: ["*.ts", "*.tsx"],
        rules: typescriptRecommended
      }
    ],
    rules: coreRecommended
  },
  "typescript-all": { rules: typescriptAll },
  "typescript-recommended": { rules: typescriptRecommended }
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

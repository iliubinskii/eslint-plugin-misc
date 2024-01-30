import { evaluate, fn, o } from "real-fns";
import type { IndexedRecord } from "type-essentials";
import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { projectChore } from "./project-chore";
import { tsMisc } from "./ts-misc";
import { typescript } from "./typescript";

export const configs = evaluate((): IndexedRecord => {
  const coreRules = {
    ...rules(core),
    "misc/match-filename": "off",
    "misc/no-restricted-syntax": "off",
    "misc/require-syntax": "off",
    "misc/wrap": "off"
  } as const;

  const eslintrcRules = rules(eslintrc);

  const jestRules = rules(jest);

  const typescriptRules = {
    ...rules(typescript),
    "misc/typescript/no-restricted-syntax": "off"
  } as const;

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
    "project-chore": { rules: rules(projectChore) },
    "ts-misc": {
      overrides: [
        {
          files: "./tests/**",
          rules: rules(tsMisc, name => name.startsWith("misc/ts-misc/jest/"))
        }
      ],
      rules: rules(tsMisc, name => !name.startsWith("misc/ts-misc/jest/"))
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

import { evaluate, fn, o } from "typescript-misc";
import type { IndexedRecord } from "typescript-misc";
import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { projectChore } from "./project-chore";
import { typescript } from "./typescript";
import { typescriptMisc } from "./typescript-misc";

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
    "typescript": { rules: typescriptRules },
    "typescript-misc": {
      overrides: [
        {
          files: "./tests/**",
          rules: rules(typescriptMisc, name =>
            name.startsWith("misc/typescript-misc/jest/")
          )
        }
      ],
      rules: rules(
        typescriptMisc,
        name => !name.startsWith("misc/typescript-misc/jest/")
      )
    }
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

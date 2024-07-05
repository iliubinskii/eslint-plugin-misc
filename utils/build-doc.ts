/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */

import { ReadonlySet, a, evaluate, is, o, s } from "typescript-misc";
import { stringify as baseStringify } from "javascript-stringify";
import fs from "node:fs";
import { rules } from "../src";

const templates = {
  config: fs
    .readFileSync("./assets/docs/templates/config.md")
    .toString()
    .trim(),
  configOptions: fs
    .readFileSync("./assets/docs/templates/config-options.md")
    .toString()
    .trim(),
  configOptionsSuboptions: fs
    .readFileSync("./assets/docs/templates/config-options-suboptions.md")
    .toString()
    .trim(),
  configSuboptions: fs
    .readFileSync("./assets/docs/templates/config-suboptions.md")
    .toString()
    .trim(),
  index: fs.readFileSync("./assets/docs/templates/index.md").toString(),
  rule: fs.readFileSync("./assets/docs/templates/rule.md").toString()
};

const documentedRules = o.entries(
  o.sort(
    o.omit(
      rules,
      (_rule, name) =>
        name.startsWith("project-chore/") || name.startsWith("typescript-misc/")
    ),
    (_value1, _value2, key1, key2) => {
      if (key1.includes("/") && !key2.includes("/")) return 1;

      if (key2.includes("/") && !key1.includes("/")) return -1;

      return key1.localeCompare(key2);
    }
  )
);

const customChecks = new ReadonlySet([
  "no-restricted-syntax",
  "require-syntax",
  "wrap",
  "typescript/no-restricted-syntax"
]);

const index = templates.index
  .replace(
    "%RULES%",
    documentedRules
      .map(([name, rule]) => listItem(name, rule.meta.docs))
      .join("\n")
  )
  .replace(
    "%CUSTOM-RULES%",
    documentedRules
      .filter(([name]) => customChecks.has(name))
      .map(([name, rule]) => listItem(name, rule.meta.docs))
      .join("\n")
  );

fs.writeFileSync("./README.md", index);
fs.writeFileSync("./docs/index.md", index);

fs.mkdirSync("./docs/eslintrc");
fs.mkdirSync("./docs/jest");
fs.mkdirSync("./docs/typescript");

const isDocs = is.object.factory(
  {
    failExamples: is.string,
    passExamples: is.string
  },
  {
    defaultOptions: is.indexedObject,
    defaultSuboptions: is.indexedObject,
    description: is.unknown,
    optionDescriptions: is.factory(is.indexedObject.of, is.string),
    optionTypes: is.factory(is.indexedObject.of, is.string),
    suboptionDescriptions: is.factory(is.indexedObject.of, is.string),
    suboptionTypes: is.factory(is.indexedObject.of, is.string),
    suboptionsKey: is.string
  }
);

for (const [name, rule] of documentedRules)
  if (isDocs(rule.meta.docs)) {
    const {
      defaultOptions,
      defaultSuboptions,
      description,
      failExamples,
      optionDescriptions,
      optionTypes,
      passExamples,
      suboptionDescriptions,
      suboptionTypes,
      suboptionsKey
    } = rule.meta.docs;

    const options = optionTypes
      ? o
          .entries(optionTypes)
          .map(([option, type]) => `${option}: ${type}`)
          .join(",\n        ")
      : "";

    const optionsAnnotation = optionDescriptions
      ? o
          .entries(optionDescriptions)
          .map(([option, optionDescription]) => {
            const defVal =
              defaultOptions && is.not.empty(defaultOptions[option])
                ? stringify(defaultOptions[option])
                : "-";

            return `| \`${option}\` | ${optionDescription} | \`${defVal}\` |`;
          })
          .join("\n")
      : "";

    const suboptions = suboptionTypes
      ? a
          .sort([
            ...o
              .entries(suboptionTypes)
              .map(([option, type]) => `${option}: ${type}`),
            "filesToLint: string[]",
            "filesToSkip: string[]"
          ])
          .join(",\n            ")
      : "";

    const suboptionsAnnotation = suboptionDescriptions
      ? a
          .sort([
            ...o
              .entries(suboptionDescriptions)
              .map(([option, optionDescription]) => {
                const defVal =
                  defaultSuboptions && is.not.empty(defaultSuboptions[option])
                    ? stringify(defaultSuboptions[option])
                    : "-";

                return `| \`${suboptionsKey}.${option}\` | ${optionDescription} | \`${defVal}\` |`;
              }),
            `| \`${suboptionsKey}.filesToLint\` | Files to lint (minimatch patterns) | \`[]\` |`,
            `| \`${suboptionsKey}.filesToSkip\` | Files to skip (minimatch patterns) | \`[]\` |`
          ])
          .join("\n")
      : "";

    const config = s.replacePairs(
      evaluate(() => {
        if (options)
          return suboptions
            ? templates.configOptionsSuboptions
            : templates.configOptions;

        return suboptions ? templates.configSuboptions : templates.config;
      }),
      {
        "%KEY%": suboptionsKey ?? "",
        "%OPTIONS%": options,
        "%OPTIONS-ANNOTATION%": optionsAnnotation,
        "%SUBOPTIONS%": suboptions,
        "%SUBOPTIONS-ANNOTATION%": suboptionsAnnotation
      }
    );

    fs.writeFileSync(
      `./docs/${name}.md`,
      s.replacePairs(templates.rule, {
        "%CONFIG%": config,
        "%DESCRIPTION%": description,
        "%FAIL-EXAMPLES%": failExamples,
        "%NAME%": name,
        "%OPTIONS%": options,
        "%PASS-EXAMPLES%": passExamples
      })
    );
  }

function listItem(
  name: string,
  docs?: { readonly description: string }
): string {
  const description = docs
    ? s.firstLine(docs.description).replace(/[.:]$/u, "")
    : "No description.";

  return `- [${name}](https://iliubinskii.github.io/eslint-plugin-misc/${name}.html) &mdash; ${description}.`;
}

function stringify(value: unknown): string | undefined {
  if (typeof value === "string") {
    const escaped = value.replaceAll('"', String.raw`\"`);

    return `"${escaped}"`;
  }

  return baseStringify(value);
}

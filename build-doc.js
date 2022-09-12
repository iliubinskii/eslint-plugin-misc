const { a, evaluate, is, o, s } = require("real-fns");

const { stringify: baseStringify } = require("javascript-stringify");

const fs = require("node:fs");

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
  index: fs.readFileSync("./assets/docs/templates/index.md").toString().trim(),
  rule: fs.readFileSync("./assets/docs/templates/rule.md").toString().trim()
};

// eslint-disable-next-line misc/no-internal-modules -- Ok
const { rules } = require("./dist/rules.core.js");

const documentedRules = o.sort(
  o.omit(
    rules,
    (_rule, name) =>
      name.startsWith("real-config/") ||
      name.startsWith("real-facades/") ||
      name.startsWith("real-framework/") ||
      name.startsWith("real-fns/") ||
      name.startsWith("quasar-extension/")
  ),
  (_value1, _value2, key1, key2) => {
    if (key1.includes("/") && !key2.includes("/")) return 1;

    if (key2.includes("/") && !key1.includes("/")) return -1;

    return key1.localeCompare(key2);
  }
);

{
  const index = templates.index.replace(
    "{{rules}}",
    o
      .keys(documentedRules)
      .map(
        name =>
          `- [${name}](https://ilyub.github.io/eslint-plugin-misc/${name}.html)`
      )
      .join("\n")
  );

  fs.writeFileSync("./README.md", index);
  fs.writeFileSync("./docs/index.md", index);
}

{
  fs.mkdirSync("./docs/eslintrc");
  fs.mkdirSync("./docs/jest");
  fs.mkdirSync("./docs/typescript");
  fs.mkdirSync("./docs/vue");

  for (const [name, rule] of o.entries(documentedRules)) {
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
          .map(([option, description]) => {
            const defVal =
              defaultOptions && is.not.empty(defaultOptions[option])
                ? stringify(defaultOptions[option])
                : "-";

            return `| \`${option}\` | ${description} | \`${defVal}\` |`;
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
            ...o.entries(suboptionDescriptions).map(([option, description]) => {
              const defVal =
                defaultSuboptions && is.not.empty(defaultSuboptions[option])
                  ? stringify(defaultSuboptions[option])
                  : "-";

              return `| \`${suboptionsKey}.${option}\` | ${description} | \`${defVal}\` |`;
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
        "{{key}}": suboptionsKey,
        "{{options}}": options,
        "{{options-annotation}}": optionsAnnotation,
        "{{suboptions}}": suboptions,
        "{{suboptions-annotation}}": suboptionsAnnotation
      }
    );

    fs.writeFileSync(
      `./docs/${name}.md`,
      s.replacePairs(templates.rule, {
        "{{config}}": config,
        "{{description}}": description,
        "{{fail-examples}}": failExamples,
        "{{name}}": name,
        "{{options}}": options,
        "{{pass-examples}}": passExamples
      })
    );
  }
}

/**
 * Stringifies value.
 *
 * @param value - Value.
 * @returns String representation.
 */
function stringify(value) {
  if (typeof value === "string") return `"${value.replace(/"/gu, '\\"')}"`;

  return baseStringify(value);
}

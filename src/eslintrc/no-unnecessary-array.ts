import * as utils from "../utils";
import { core } from "../core";
import { evaluate } from "real-fns";

export const noUnnecessaryArray = evaluate(() => {
  const obj = {
    options:
      "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression",
    overrides:
      "Property[key.name=overrides] > ArrayExpression > ObjectExpression",
    root: "AssignmentExpression[left.object.name=module][left.property.name=exports] > ObjectExpression",
    suboptions:
      "Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression > ObjectExpression"
  } as const;

  const prop = {
    array:
      "Property[key.name=/^(?:allow|disallow|ignoreSelector|pattern|propertyPattern|selector)$/u]",
    overrides: "Property[key.name=/^(?:extends|files)$/u]",
    root: "Property[key.name=/^(?:extends)$/u]"
  } as const;

  const suffix = "ArrayExpression[elements.length=1]";

  return utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
      {
        message: "Unnecessary array",
        selector: [
          `${obj.root} > ${prop.root} > ${suffix}`,
          `${obj.overrides} > ${prop.overrides} > ${suffix}`,
          `${obj.options} > ${prop.array} > ${suffix}`,
          `${obj.options} > ${obj.suboptions} > ${prop.array} > ${suffix}`
        ]
      }
    ],
    docs: {
      description:
        "Disallows unnessecary single-element arrays in eslint configuration files.",
      failExamples: `
        module.exports = {
          overrides: [
            {
              files: ["./a"]
            }
          ]
        };
      `,
      passExamples: `
        module.exports = {
          overrides: [
            {
              files: "./a"
            },
            {
              files: ["./a", "./b"]
            }
          ]
        };
      `
    }
  });
});

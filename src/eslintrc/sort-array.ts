import * as utils from "../utils";
import { core } from "../core";
import { evaluate } from "typescript-misc";

export const sortArray = evaluate(() => {
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
      "Property[key.name=/^(?:allow|disallow|excludeSelectors|ignoreSelector|includeSelectors|pattern|propertyPattern|selector)$/u]",
    arrayOfArrays: "Property[key.name=/^(?:hierarchy)$/u]",
    overrides: "Property[key.name=/^(?:files|globals|ignorePatterns)$/u]",
    root: "Property[key.name=/^(?:globals|ignorePatterns)$/u]"
  } as const;

  const arr = "ArrayExpression";

  const suffix = "ArrayExpression";

  return utils.wrapRule({
    rule: core["sort-array"],
    options: [
      {
        selector: [
          `${obj.root} > ${prop.root} > ${suffix}`,
          `${obj.overrides} > ${prop.overrides} > ${suffix}`,
          `${obj.options} > ${prop.array} > ${suffix}`,
          `${obj.options} > ${obj.suboptions} > ${prop.array} > ${suffix}`,
          `${obj.options} > ${obj.suboptions} > ${prop.arrayOfArrays} > ${arr} > ${suffix}`
        ],
        triggerByComment: false
      }
    ],
    docs: {
      description:
        "Sorts safely sortable arrays in eslint configuration files.",
      failExamples: `
        module.exports = {
          overrides: [
            {
              files: ["./b", "./a"]
            }
          ]
        };
      `,
      passExamples: `
        module.exports = {
          overrides: [
            {
              files: ["./a", "./b"]
            }
          ]
        };
      `
    }
  });
});

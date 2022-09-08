import * as utils from "../utils";
import { core } from "../core";
import { evaluate } from "real-fns";

export const noUnnecessaryArray = evaluate(() => {
  const prefix =
    "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression";

  const suffix =
    "Property[key.name=/^(?:allow|disallow|ignoreSelector|pattern|propertyPattern|selector)$/u] > ArrayExpression[elements.length=1]";

  return utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
      {
        message: "Unnecessary array",
        selector: [
          "AssignmentExpression[left.object.name=module][left.property.name=exports] > ObjectExpression > Property[key.name=extends] > ArrayExpression[elements.length=1]",
          "Property[key.name=overrides] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:extends|files)$/u] > ArrayExpression[elements.length=1]",
          `${prefix} > ${suffix}`,
          `${prefix} > Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression > ObjectExpression > ${suffix}`
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

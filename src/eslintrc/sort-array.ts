import * as utils from "../utils";
import { core } from "../core";
import { evaluate } from "real-fns";

export const sortArray = evaluate(() => {
  const prefix =
    "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression";

  const suffix =
    "Property[key.name=/^(?:allow|disallow|excludeSelectors|ignoreSelector|includeSelectors|pattern|propertyPattern|selector)$/u] > ArrayExpression";

  return utils.wrapRule({
    rule: core["sort-array"],
    options: [
      {
        selector: [
          "Property[key.name=overrides] > ArrayExpression > ObjectExpression > Property[key.name=files] > ArrayExpression",
          `${prefix} > ${suffix}`,
          `${prefix} > Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression > ObjectExpression > ${suffix}`
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

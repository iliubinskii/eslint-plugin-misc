import * as utils from "../utils";
import { misc } from "../misc";

export const sortArray = utils.wrapRule({
  rule: misc["sort-array"],
  options: [
    {
      selector: [
        "Property[key.name=overrides] > ArrayExpression > ObjectExpression > Property[key.name=files] > ArrayExpression",
        "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:allow|disallow|ignoreSelector|pattern|propertyPattern|selector)$/u] > ArrayExpression"
      ],
      triggerByComment: false
    }
  ],
  docs: {
    description: "Sorts safely sortable arrays in eslint configuration files.",
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

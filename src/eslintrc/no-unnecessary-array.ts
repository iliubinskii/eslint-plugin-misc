import * as utils from "../utils";
import { misc } from "../misc";

export const noUnnecessaryArray = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary array",
      selector: [
        "Property[key.name=overrides] > ArrayExpression > ObjectExpression > Property[key.name=files] > ArrayExpression[elements.length=1]",
        "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:allow|disallow|ignoreSelector|pattern|propertyPattern|selector)$/u] > ArrayExpression[elements.length=1]"
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

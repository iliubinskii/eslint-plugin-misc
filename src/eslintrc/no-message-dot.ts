import * as utils from "../utils";
import { core } from "../core";

export const noMessageDot = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary array",
      selector:
        "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=message] > Literal.value[value=/\\.$/u]"
    }
  ],
  docs: {
    description: "Disallows dot at the end of message.",
    failExamples: `
      module.exports = {
        rules: {
          "misc/require-syntax": [
            "warn",
            {
              message: "Error message."
            }
          ]
        }
      };
    `,
    passExamples: `
      module.exports = {
        rules: {
          "misc/require-syntax": [
            "warn",
            {
              message: "Error message"
            }
          ]
        }
      };
    `
  }
});

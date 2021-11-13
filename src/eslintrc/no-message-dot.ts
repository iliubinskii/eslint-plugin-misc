import * as utils from "../utils";
import { misc } from "../misc";

export const noMessageDot = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Unnecessary array",
      selector:
        "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=message] > Literal.value[value=/\\.$/u]"
    }
  ],
  docs: {
    description: "Disallows dot at the end of message.",
    failExamples: `
      module.exports = {
        rules: {
          "@skylib/require-syntax": [
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
          "@skylib/require-syntax": [
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

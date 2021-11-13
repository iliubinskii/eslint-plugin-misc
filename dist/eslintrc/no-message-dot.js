"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMessageDot = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.noMessageDot = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary array",
            selector: "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=message] > Literal.value[value=/\\.$/u]"
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
//# sourceMappingURL=no-message-dot.js.map
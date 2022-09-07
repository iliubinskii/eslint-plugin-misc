"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noMessageDot = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
exports.noMessageDot = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary array",
            selector: "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=message] > Literal.value[value=/\\.$/u]"
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
//# sourceMappingURL=no-message-dot.js.map
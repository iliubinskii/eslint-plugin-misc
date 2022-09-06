"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
exports.noUnnecessaryArray = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
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
        description: "Disallows unnessecary single-element arrays in eslint configuration files.",
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
//# sourceMappingURL=no-unnecessary-array.js.map
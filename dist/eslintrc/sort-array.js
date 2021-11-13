"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortArray = utils.wrapRule({
    rule: misc_1.misc["sort-array"],
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
//# sourceMappingURL=sort-array.js.map
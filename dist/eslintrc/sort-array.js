"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
const real_fns_1 = require("real-fns");
exports.sortArray = (0, real_fns_1.evaluate)(() => {
    const prefix = "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression";
    const suffix = "Property[key.name=/^(?:allow|disallow|excludeSelectors|ignoreSelector|includeSelectors|pattern|propertyPattern|selector)$/u] > ArrayExpression";
    return utils.wrapRule({
        rule: core_1.core["sort-array"],
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
});
//# sourceMappingURL=sort-array.js.map
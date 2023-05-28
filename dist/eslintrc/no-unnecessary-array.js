"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryArray = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("../core");
const real_fns_1 = require("real-fns");
exports.noUnnecessaryArray = (0, real_fns_1.evaluate)(() => {
    const obj = {
        options: "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression",
        overrides: "Property[key.name=overrides] > ArrayExpression > ObjectExpression",
        root: "AssignmentExpression[left.object.name=module][left.property.name=exports] > ObjectExpression",
        suboptions: "Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression > ObjectExpression"
    };
    const prop = {
        array: "Property[key.name=/^(?:allow|disallow|ignoreSelector|pattern|propertyPattern|selector)$/u]",
        overrides: "Property[key.name=/^(?:extends|files)$/u]",
        root: "Property[key.name=/^(?:extends)$/u]"
    };
    const suffix = "ArrayExpression[elements.length=1]";
    return utils.wrapRule({
        rule: core_1.core["no-restricted-syntax"],
        options: [
            {
                message: "Unnecessary array",
                selector: [
                    `${obj.root} > ${prop.root} > ${suffix}`,
                    `${obj.overrides} > ${prop.overrides} > ${suffix}`,
                    `${obj.options} > ${prop.array} > ${suffix}`,
                    `${obj.options} > ${obj.suboptions} > ${prop.array} > ${suffix}`
                ]
            }
        ],
        docs: {
            description: "Disallows unnecessary single-element arrays in eslint configuration files.",
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
});
//# sourceMappingURL=no-unnecessary-array.js.map
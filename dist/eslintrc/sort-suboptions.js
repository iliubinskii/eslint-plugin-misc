"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortSuboptions = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.sortSuboptions = utils.wrapRule({
    rule: misc_1.misc["sort-array"],
    options: [
        {
            selector: "Property[key.value=/@skylib\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression",
            sendToBottom: /^catch-all$/u.source,
            sortKey: "_id",
            triggerByComment: false
        }
    ],
    docs: {
        description: "Sorts safely sortable arrays in eslint configuration files.",
        failExamples: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [{ _id: "b" }, { _id: "a" }]
            }
          ]
        }
      };
    `,
        passExamples: `
      module.exports = {
        rules: {
          "@skylib/sort-keys": [
            "warn",
            {
              overrides: [{ _id: "a" }, { _id: "b" }]
            }
          ]
        }
      };
    `
    }
});
//# sourceMappingURL=sort-suboptions.js.map
import * as utils from "../utils";
import { core } from "../core";

export const sortSuboptions = utils.wrapRule({
  rule: core["sort-array"],
  options: [
    {
      selector:
        "Property[key.value=/^misc\\u002F/u] > ArrayExpression > ObjectExpression > Property[key.name=/^(?:folders|overrides|rules|sources)$/u] > ArrayExpression",
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
          "misc/sort-keys": [
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
          "misc/sort-keys": [
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

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["config/eslintrc/no-temp"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-temp",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        module.exports = {
          rules: {}
        };
      `,
      errors: [{ line: 1, endLine: 3, messageId: MessageId.customMessage }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "module.exports = {};"
    }
  ]
);

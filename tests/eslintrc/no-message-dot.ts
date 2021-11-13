import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["eslintrc/no-message-dot"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-message-dot", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: {
          "@skylib/rule1": [
            "warn",
            {
              message: "Error message."
            }
          ],
          "@skylib/rule2": [
            "warn",
            {
              message: "Error message"
            }
          ]
        }
      };
    `,
    errors: [{ line: 6, messageId: MessageId.customMessage }]
  }
]);

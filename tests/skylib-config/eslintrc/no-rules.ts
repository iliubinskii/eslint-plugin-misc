import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["config/eslintrc/no-rules"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-rules", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      module.exports = {
        rules: {}
      };
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);

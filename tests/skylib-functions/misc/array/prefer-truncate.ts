import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/prefer-truncate"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-truncate", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[].length = 0;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

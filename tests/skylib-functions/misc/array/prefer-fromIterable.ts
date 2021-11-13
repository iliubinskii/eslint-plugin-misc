import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/prefer-fromIterable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-fromIterable", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[...arr]",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

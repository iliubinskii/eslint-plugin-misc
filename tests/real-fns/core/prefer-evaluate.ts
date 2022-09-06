import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/prefer-evaluate"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-evaluate", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "(() => {})();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

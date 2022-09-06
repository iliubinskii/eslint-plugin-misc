import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/empty-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("empty-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.empty(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/empty-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("empty-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.empty(null);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/null-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("null-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.null(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

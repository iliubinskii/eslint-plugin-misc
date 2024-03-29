import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript-misc/functions/guards/null-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("null-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.null(null);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

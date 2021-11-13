import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/not-empty-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("not-empty-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.not.empty(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

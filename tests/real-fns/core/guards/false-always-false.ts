import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/false-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("false-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.false(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

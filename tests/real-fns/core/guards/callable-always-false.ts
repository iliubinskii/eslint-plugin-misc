import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/callable-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("callable-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.callable(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/number-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("number-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.number(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

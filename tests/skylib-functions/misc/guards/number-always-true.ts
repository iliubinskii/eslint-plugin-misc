import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/number-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("number-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.number(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

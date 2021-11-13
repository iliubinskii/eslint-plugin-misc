import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/undefined-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("undefined-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.undefined(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/boolean-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("boolean-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.boolean(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

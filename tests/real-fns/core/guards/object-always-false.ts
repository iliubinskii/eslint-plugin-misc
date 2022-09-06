import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/object-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("object-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.object(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

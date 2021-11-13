import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/array-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("array-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.array(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

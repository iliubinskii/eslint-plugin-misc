import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/enumeration-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("enumeration-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.enumeration(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

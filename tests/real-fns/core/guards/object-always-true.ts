import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/object-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("object-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.object({});",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

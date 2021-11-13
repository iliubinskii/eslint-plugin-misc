import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/array-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("array-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.array([]);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

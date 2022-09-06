import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/prefer-values"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-values", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.values();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

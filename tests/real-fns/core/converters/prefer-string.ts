import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/converters/prefer-string"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-string", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "String(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

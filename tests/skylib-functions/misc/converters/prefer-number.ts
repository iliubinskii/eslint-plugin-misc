import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/converters/prefer-number"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-number", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Number(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

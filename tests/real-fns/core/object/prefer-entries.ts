import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/prefer-entries"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-entries", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.entries();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/prefer-assign"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-assign", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.assign();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

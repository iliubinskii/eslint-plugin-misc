import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/prefer-hasOwnProp"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-hasOwnProp", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.prototype.hasOwnProperty.call();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

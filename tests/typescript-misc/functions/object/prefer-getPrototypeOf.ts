import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript-misc/functions/object/prefer-getPrototypeOf"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-getPrototypeOf", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "Object.getPrototypeOf();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

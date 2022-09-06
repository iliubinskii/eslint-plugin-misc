import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/set-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("set-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.set(1, is.string);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

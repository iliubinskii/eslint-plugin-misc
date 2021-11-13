import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/true-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("true-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.true(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

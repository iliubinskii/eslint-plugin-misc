import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript-misc/functions/guards/instanceOf-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("instanceOf-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.instanceOf(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

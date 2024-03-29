import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript-misc/functions/guards/boolean-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("boolean-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.boolean(true);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/undefined-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("undefined-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.undefined(undefined);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

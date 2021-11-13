import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/no-unfreeze"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unfreeze", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "o.unfreeze();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

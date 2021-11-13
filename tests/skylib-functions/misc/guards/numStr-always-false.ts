import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/numStr-always-false"];

const MessageId = utils.getMessageId(rule);

utils.testRule("numStr-always-false", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.numStr(false);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

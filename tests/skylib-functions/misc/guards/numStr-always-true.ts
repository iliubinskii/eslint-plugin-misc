import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/numStr-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("numStr-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.numStr(1);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

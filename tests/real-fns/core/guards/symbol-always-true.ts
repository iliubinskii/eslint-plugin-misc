import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/guards/symbol-always-true"];

const MessageId = utils.getMessageId(rule);

utils.testRule("symbol-always-true", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "is.symbol(Symbol());",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

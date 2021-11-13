import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/prefer-ReadonlySet"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-ReadonlySet", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = new Set<number>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

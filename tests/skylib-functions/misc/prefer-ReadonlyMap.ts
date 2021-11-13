import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/prefer-ReadonlyMap"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-ReadonlyMap", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = new Map<string, number>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

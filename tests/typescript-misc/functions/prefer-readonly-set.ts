import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript-misc/functions/prefer-readonly-set"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-readonly-set", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "const x = new Set<number>();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

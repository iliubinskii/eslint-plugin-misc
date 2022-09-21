import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["type-essentials/prefer-WritableRecord"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-WritableRecord", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = Record<string, number>;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

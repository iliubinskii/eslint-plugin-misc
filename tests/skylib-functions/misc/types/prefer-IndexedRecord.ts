import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/prefer-IndexedRecord"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-IndexedRecord", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = Rec<string, number>;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

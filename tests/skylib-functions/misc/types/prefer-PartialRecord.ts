import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/prefer-PartialRecord"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-PartialRecord", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = Partial<Rec<string, number>>;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

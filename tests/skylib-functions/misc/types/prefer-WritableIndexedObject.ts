import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/prefer-WritableIndexedObject"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-WritableIndexedObject", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "type T = WritableRecord<PropertyKey, string>;",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

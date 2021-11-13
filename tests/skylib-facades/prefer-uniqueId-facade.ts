import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["facades/prefer-uniqueId-facade"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-uniqueId-facade", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "_.uniqueId();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

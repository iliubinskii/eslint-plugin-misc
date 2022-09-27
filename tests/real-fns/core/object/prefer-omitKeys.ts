import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["real-fns/object/prefer-omitKeys"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-omitKeys", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "_.omit();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

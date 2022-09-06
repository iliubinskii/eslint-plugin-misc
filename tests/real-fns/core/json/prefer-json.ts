import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/json/prefer-json"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-json", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "JSON.stringify();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

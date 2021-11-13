import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule =
  rules["quasar-extension/vue/script/require-validateProps-type-param"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-validateProps-type-param", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "validateProps();",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

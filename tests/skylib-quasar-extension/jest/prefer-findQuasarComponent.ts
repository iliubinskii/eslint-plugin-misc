import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/jest/prefer-findQuasarComponent"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-findQuasarComponent", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "wrapper.findComponent(QBtn);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

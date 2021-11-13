import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/jest/prefer-testComponents"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-testComponents", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "wrapper.findComponent(components.BaseButton);",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

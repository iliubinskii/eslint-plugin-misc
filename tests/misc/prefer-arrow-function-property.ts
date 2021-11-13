import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["prefer-arrow-function-property"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-arrow-function-property", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = { f: function () {} };
      const y = { f: () => {} };
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

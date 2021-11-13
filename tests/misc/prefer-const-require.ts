import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["prefer-const-require"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-const-require", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f() { return require("source"); }
      const x = require("source");
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

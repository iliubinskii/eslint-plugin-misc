import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/define-function-in-one-statement"];

const MessageId = utils.getMessageId(rule);

utils.testRule("define-function-in-one-statement", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f() {}
      f.x = 1;
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-shadow"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-shadow", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = 1;
      function f() { const x = 1; }
      enum E { x = "x" }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          message:
            "'x' is already declared in the upper scope on line 1 column 7."
        }
      }
    ]
  }
]);

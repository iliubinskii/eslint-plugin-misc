import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-param-reassign"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-param-reassign",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        function f(x, y) {
          x;
          y++;
        }
      `,
      errors: [{ line: 3, messageId: MessageId.customMessage }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const f = (x, y) => {
          x;
          y++;
        };
      `,
      errors: [{ line: 3, messageId: MessageId.customMessage }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        function f(x, y) {
          x++;
          y;
        }
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const f = (x, y) => {
          x++;
          y;
        };
      `
    }
  ]
);

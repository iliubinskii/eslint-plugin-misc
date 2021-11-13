import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-readonly-property"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-readonly-property", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        x: string;
        readonly y: string;
      }
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
        x: string;
        readonly y: string;
      }
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);

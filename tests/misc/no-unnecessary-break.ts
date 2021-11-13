import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-unnecessary-break"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-break", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      switch (x) {
        case 1:
          break;
        case 2:
          break;
      }
    `,
    errors: [{ line: 5, messageId: MessageId.customMessage }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      switch (x) {
        case 1:
          break;
        default:
          break;
      }
    `,
    errors: [{ line: 5, messageId: MessageId.customMessage }]
  }
]);

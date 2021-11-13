import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["switch-case-spacing"];

const MessageId = utils.getMessageId(rule);

utils.testRule("switch-case-spacing", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      switch (x) {
        case 1:

        case 2:
          break;
        case 3:
      }
    `,
    output: `
      switch (x) {
        case 1:
        case 2:
          break;

        case 3:
      }
    `,
    errors: [
      { line: 4, endLine: 5, messageId: MessageId.removeEmptyLine },
      { line: 6, messageId: MessageId.addEmptyLine }
    ]
  }
]);

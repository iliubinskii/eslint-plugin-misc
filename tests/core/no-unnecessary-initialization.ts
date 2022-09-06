import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-unnecessary-initialization"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-initialization", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = undefined;
      class C {
        x = undefined;
      }
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);

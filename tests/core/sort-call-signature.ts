import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-call-signature"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-call-signature", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
       x: string;
       (): string;
      }
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);

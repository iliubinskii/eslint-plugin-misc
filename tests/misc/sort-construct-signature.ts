import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-construct-signature"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-construct-signature", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
       x: string;
       new (): string;
      }
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);

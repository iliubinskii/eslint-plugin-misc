import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-boolean-literal-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-boolean-literal-type", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
        x?: true;
        y?: false;
        z?: boolean;
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);

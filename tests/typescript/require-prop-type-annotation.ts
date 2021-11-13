import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/require-prop-type-annotation"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-prop-type-annotation", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        x;
        y: string;
        z = "";
      }
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);

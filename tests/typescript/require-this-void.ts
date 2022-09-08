import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/require-this-void"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-this-void", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        static f() {}
        static g(this: void) {}
      }
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);

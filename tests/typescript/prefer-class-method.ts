import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/prefer-class-method"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-class-method", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        static f = () => {};
        g = () => {};
      }

      class D {
        static f() {}
        g() {}
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);

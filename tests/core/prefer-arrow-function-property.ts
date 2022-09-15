import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["prefer-arrow-function-property"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-arrow-function-property", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = {
        f() {},
        g: function () {}
      };

      const y = {
        f: () => {},
        g(this: void) {},
        h: function (this: void) {}
      };
    `,
    errors: [
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);

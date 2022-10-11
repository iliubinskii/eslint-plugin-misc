import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/class-methods-use-this"];

const MessageId = utils.getMessageId(rule);

utils.testRule("class-methods-use-this", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        f() {}
        g(this: void) {}
        get h() {}
      }
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: { message: "Expected 'this' to be used by class method 'f'." }
      }
    ]
  }
]);

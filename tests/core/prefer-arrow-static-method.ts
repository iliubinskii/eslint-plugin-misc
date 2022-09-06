import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["prefer-arrow-static-method"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-arrow-static-method", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C { static f() {} }
      class D { static f = () => {}; }
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

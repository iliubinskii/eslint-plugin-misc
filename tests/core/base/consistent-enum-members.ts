import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-enum-members"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-enum-members", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      enum E {
        a = "a",
        b = "c",
        c = 1
      }
    `,
    errors: [
      { line: 3, messageId: MessageId.inconsistentMember },
      { line: 4, messageId: MessageId.inconsistentMember }
    ]
  }
]);

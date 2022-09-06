import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-language-mixing"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-language-mixing", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x1 = "абвxyz";
      const x2 = "xyzабв";
      const x3 = "абв123xyz";
      const x4 = "xyz123абв";
      const x5 = "xyz";
      const x6 = "123";
      const x7 = "абв";
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["jest/prefer-toStrictEqual"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-toStrictEqual", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = {};
      const y = 1;
      expect(z).toBe(x);
      expect(z).toBe(y);
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);

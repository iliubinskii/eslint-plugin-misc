import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["jest/prefer-toBe"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-toBe", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = 1;
      const y = {};
      expect(z).toStrictEqual(x);
      expect(z).toStrictEqual(y);
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);

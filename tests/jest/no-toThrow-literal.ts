import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["jest/no-toThrow-literal"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-toThrow-literal", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      expect(f).toThrow("str");
      expect(f).toThrow(new Error("str"));
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);

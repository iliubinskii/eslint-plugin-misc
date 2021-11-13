import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/jest/prefer-mockCallsToBe"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-mockCallsToBe", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      expect(f).toHaveBeenCalled();
      expect(f).toHaveBeenCalledTimes();
      expect(f).toHaveBeenCalledWith();
      mockClear(f);
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);

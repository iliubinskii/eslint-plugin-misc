import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-negated-conditions"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-negated-conditions", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      if (!x) {}
      if (!x && y) {}
      if (x !== 1) {}
      if (x !== 1 && y) {}
      if (x) {}
      if (x && y) {}
      if (x === 1) {}
      if (x === 1 && y) {}
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);

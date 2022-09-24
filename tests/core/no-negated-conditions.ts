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
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const a = !x && y;
      const b = x && !y;
      const c = x !== 1 && y;
      const d = x && y !== 1;
      const e = x && y !== 1 && z;
      const f = x && y && z !== 1;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      if (!x || y) {}
      if (x || !y) {}
      if (x !== 1 || y) {}
      if (x || y !== 1) {}
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const a = !x || y;
      const b = x || !y;
      const c = x !== 1 || y;
      const d = x || y !== 1;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);

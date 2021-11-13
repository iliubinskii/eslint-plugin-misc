import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["max-identifier-blocks"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "max-identifier-blocks",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const AaaBbbCccDddEee = 1;
        const aaaBbbCccDddEee = 1;
        const AaaBbbCccDdd = 1;
        const aaaBbbCccDdd = 1;
        const AaaBbbCccDddE = 1;
        const aaaBbbCccDddE = 1;
      `,
      errors: [
        { line: 1, messageId: MessageId.customMessage },
        { line: 2, messageId: MessageId.customMessage }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const AaaBbbCccDddEee = 1;
        class C { AaaBbbCccDddEee: string; }
        interface I { AaaBbbCccDddEee: string; }
        function aaaBbbCccDddEee() {}
        const x = { aaaBbbCccDddEee: 1 };
      `,
      errors: [
        { line: 1, messageId: MessageId.customMessage },
        { line: 2, messageId: MessageId.customMessage },
        { line: 3, messageId: MessageId.customMessage },
        { line: 4, messageId: MessageId.customMessage },
        { line: 5, messageId: MessageId.customMessage }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        aaaBbbCccDddEee.x;
        x1.aaaBbbCccDddEee;
        const x2 = { aaaBbbCccDddEee };
        const x3 = { value: aaaBbbCccDddEee };
        const { aaaBbbCccDddEee } = x4;
      `
    }
  ]
);

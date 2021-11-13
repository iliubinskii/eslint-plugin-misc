import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-complex-declarator-type"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-complex-declarator-type",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "export default { value: 1 };",
      errors: [{ line: 1, messageId: MessageId.customMessage }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x1 = { value: 1 };
        const [x2, x3] = [1, { value: 1 }];
        const { x4, x5: x6 } = { x4: 1, x5: { value: 1 } };
      `,
      errors: [
        { line: 1, messageId: MessageId.customMessage },
        { line: 2, messageId: MessageId.customMessage },
        { line: 3, messageId: MessageId.customMessage }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x1 = { value: 1 } as const;
        const [x2, x3] = [1, { value: 1 }] as const;
        const { x4, x5: x6 } = { x4: 1, x5: { value: 1 } } as const;
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x1: I = { value: 1 };
        const [x2, x3] = [1, 2];
        const { x4, x5: x6 } = { x4: 1, x5: 2 };
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        const x = {};
        const y = () => 1;
        const z = new Map();
      `
    }
  ]
);

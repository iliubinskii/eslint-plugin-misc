import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["template-literal-format"];

const MessageId = utils.getMessageId(rule);

utils.testRule("template-literal-format", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = \`template literal\`;

      const y = \`template literal
        \`;

      const y = \`
        template literal\`;
    `,
    errors: [
      { line: 3, endLine: 4, messageId: MessageId.invalidFormat },
      { line: 6, endLine: 7, messageId: MessageId.invalidFormat }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = \`
          template literal

          template literal
          \`;
    `,
    output: `
      const x = \`
        template literal

        template literal
      \`;
    `,
    errors: [{ line: 1, endLine: 5, messageId: MessageId.invalidFormat }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      {
        const y = \`
      template literal

      template literal
      \`;
      }
    `,
    output: `
      {
        const y = \`
          template literal

          template literal
        \`;
      }
    `,
    errors: [{ line: 2, endLine: 6, messageId: MessageId.invalidFormat }]
  }
]);

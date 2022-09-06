import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-unnecessary-template-literal"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-template-literal", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = \`
        text
      \`;

      const y = \`
        text
        text
      \`;

      const z = \`
        text \${x} text
      \`;
    `,
    errors: [
      { line: 1, endLine: 3, messageId: MessageId.unnecessaryTemplateLiteral }
    ]
  }
]);

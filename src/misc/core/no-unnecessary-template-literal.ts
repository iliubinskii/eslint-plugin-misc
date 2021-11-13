import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";

export enum MessageId {
  unnecessaryTemplateLiteral = "unnecessaryTemplateLiteral"
}

export const noUnnecessaryTemplateLiteral = utils.createRule({
  name: "no-unnecessary-template-literal",
  vue: true,
  messages: {
    [MessageId.unnecessaryTemplateLiteral]: "Unnecessary template literal"
  },
  docs: {
    description: "Disallows unnecessary template literals.",
    failExamples: `
      const x = \`
        text
      \`;
    `,
    passExamples: `
      const x = "text";

      const y = \`
        text
        text
      \`;

      const z = \`
        text \${x} text
      \`;
    `
  },
  create: (context): RuleListener => ({
    TemplateLiteral: node => {
      if (
        node.expressions.length ||
        node.quasis.some(quasi => quasi.value.raw.trim().includes("\n"))
      ) {
        // Valid
      } else
        context.report({
          messageId: MessageId.unnecessaryTemplateLiteral,
          node
        });
    }
  })
});

import * as utils from "../../utils";
import type {
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { s } from "@skylib/functions";

export enum MessageId {
  unexpectedEmptyLine = "unexpectedEmptyLine"
}

export const noExpressionEmptyLines = utils.createRule({
  name: "no-expression-empty-lines",
  fixable: utils.Fixable.whitespace,
  vue: true,
  messages: { [MessageId.unexpectedEmptyLine]: "Unexpected empty line before" },
  docs: {
    description: "Disallows empty lines inside expressions.",
    failExamples: `
      const result = []

        .map(x => x)

        .map(x => x);
    `,
    passExamples: `
      const result = []
        .map(x => x)
        .map(x => x);
    `
  },
  create: (context): RuleListener => ({
    MemberExpression: node => {
      const pos = node.object.range[1];

      const got = s.leadingSpaces(context.getText(pos));

      if (got.includes("\n")) {
        const expected = context.eol + s.trimLeadingEmptyLines(got);

        if (got === expected) {
          // Valid
        } else
          context.report({
            fix: (): RuleFix => ({
              range: [pos, pos + got.length],
              text: expected
            }),
            messageId: MessageId.unexpectedEmptyLine,
            node: node.property
          });
      }
    }
  })
});

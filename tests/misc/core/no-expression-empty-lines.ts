import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-expression-empty-lines"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-expression-empty-lines",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        []

        .map(x => x)

        .map(x => x);
      `,
      output: `
        []
        .map(x => x)
        .map(x => x);
      `,
      errors: [
        { line: 3, messageId: MessageId.unexpectedEmptyLine },
        { line: 5, messageId: MessageId.unexpectedEmptyLine }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        []
        .map(x => x)
        // Comment
        .map(x => x);
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "[].map(x => x).map(x => x);"
    }
  ]
);

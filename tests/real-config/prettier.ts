import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["config/prettier"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "prettier",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        module.exports = {
          arrowParens: "?",
          endOfLine: "?",
          quoteProps: "?",
          trailingComma: "?",
          unknown: "?"
        };
      `,
      errors: [
        { line: 1, endLine: 7, messageId: MessageId.customMessage },
        { line: 2, messageId: MessageId.customMessage },
        { line: 3, messageId: MessageId.customMessage },
        { line: 4, messageId: MessageId.customMessage },
        { line: 5, messageId: MessageId.customMessage },
        { line: 6, messageId: MessageId.customMessage }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        module.exports = {
          arrowParens: "avoid",
          endOfLine: "lf",
          quoteProps: "preserve",
          trailingComma: "none"
        };
      `
    }
  ]
);

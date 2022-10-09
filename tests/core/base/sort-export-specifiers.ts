import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-export-specifiers"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-export-specifiers", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export { d, c };
      export { a, b };
    `,
    output: `
      export { c, d };
      export { a, b };
    `,
    errors: [{ line: 1, messageId: MessageId.incorrectSortingOrder }]
  }
]);

import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/require-jsdoc"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-jsdoc", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      export const f = defineFn(
        () => {},
        {
          x: () => {}
        }
      );
    `,
    errors: [
      { line: 2, messageId: MessageId.undocumented },
      { line: 4, messageId: MessageId.undocumented }
    ]
  }
]);
